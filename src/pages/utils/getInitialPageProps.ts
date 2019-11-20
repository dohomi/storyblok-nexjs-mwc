import { NextPageContext } from 'next'
import StoryblokService from '../../utils/StoryblokService'
import DeviceDetectService from '../../utils/DeviceDetectService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppConfigProps, AppPageProps, PageSeoProps } from '../../utils/parsePageProperties'
import projects from '@projects'
import { StoriesParams } from 'storyblok-js-client'
import StoriesService from '../../utils/StoriesService'

export type OnInitialPagePropsHook = {
  overwriteDisableRobots: boolean
  slug: string
  host: string
  settingsPath: string
  rootDirectory: string
  categories: string
}

const resolveAllPromises = (promises: Promise<any>[]) => {
  return Promise.all(
    promises.map(p => p.catch((e) => {
      const errorObj = {
        status: e.response && e.response.status,
        url: e.response && e.response.config && e.response.config.url
      }
      console.log(errorObj)

      return null
    }))
  )
}
const returnBaseProps = (error: any): AppPageProps => ({
  page: { _uid: '', component: 'page' },
  error,
  settings: { _uid: '', component: 'global', theme_base: 'base' },
  allCategories: [],
  allStories: [],
  config: StoriesService.getConfig(),
  locale: ''
})


const getSettingsPath = ({ locale, CONFIG }: { locale?: string, CONFIG: AppConfigProps }) => {
  const directory = CONFIG.rootDirectory || locale || ''
  return `cdn/stories/${directory ? `${directory}/` : ''}settings`
}

const getCategoryParams = ({ locale, CONFIG }: { locale?: string, CONFIG: AppConfigProps }) => {
  const params: StoriesParams = {
    per_page: 100,
    sort_by: 'content.name:asc',
    filter_query: {
      'component': {
        'in': 'category'
      }
    }
  }
  if (CONFIG.rootDirectory) {
    params.starts_with = `${CONFIG.rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

const getStoriesParams = ({ locale, CONFIG }: { locale?: string, CONFIG: AppConfigProps }) => {
  const params: StoriesParams = {
    per_page: 100,
    excluding_fields: 'body,meta_robots,property,meta_title,meta_description,seo_body',
    sort_by: 'published_at:desc',
    filter_query: {
      'component': {
        'in': 'page'
      }
    }
  }
  if (CONFIG.rootDirectory) {
    params.starts_with = `${CONFIG.rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

type ApiProps = {
  pageSlug: string
  locale?: string
  isLandingPage?: boolean
  CONFIG: AppConfigProps
}

const apiRequestResolver = async ({ pageSlug, locale, isLandingPage, CONFIG }: ApiProps) => {
  const all: any[] = [
    StoryblokService.get(`cdn/stories/${pageSlug}`),
    StoryblokService.get(getSettingsPath({ locale, CONFIG })),
    StoryblokService.getAll('cdn/stories', getCategoryParams({ locale, CONFIG })),
    StoryblokService.getAll('cdn/stories', getStoriesParams({ locale, CONFIG }))
  ]

  if (CONFIG.suppressSlugLocale && CONFIG.languages.length > 1 && !isLandingPage) {
    let [, ...languagesWithoutDefault] = CONFIG.languages // make sure default language is always first of array
    languagesWithoutDefault.forEach((locale) => {
      all.push(StoryblokService.get(`cdn/stories/${locale}/${pageSlug}`))
    })
  }

  let [page, settings, categories, stories, ...otherPageLanguages] = await resolveAllPromises(all)

  if (page === null && otherPageLanguages.length) {
    otherPageLanguages.forEach((value, index) => {
      if (value) {
        locale = CONFIG.languages[index + 1] // overwrite locale
        page = value // overwrite page values of localized page
      }
    })

    // make 2nd API calls to fetch locale based settings and other values
    let [localizedSettings, localizedCategories, localizedStories] = await resolveAllPromises([
      StoryblokService.get(getSettingsPath({ locale, CONFIG })),
      StoryblokService.getAll('cdn/stories', getCategoryParams({ locale, CONFIG })),
      StoryblokService.getAll('cdn/stories', getStoriesParams({ locale, CONFIG }))
    ])
    settings = localizedSettings
    categories = localizedCategories
    stories = localizedStories
  }

  return {
    page,
    settings,
    categories,
    stories,
    locale
  }
}

const getInitialPageProps = async (ctx: NextPageContext): Promise<AppPageProps> => {
  let CONFIG: AppConfigProps = {
    publicToken: '',
    previewToken: '',
    defaultLocale: '',
    languages: []
  }
  const { query, req, res, pathname, asPath } = ctx
  const host: string = req ? req.headers.host as string : window.location.host
  const initSlug = asPath === '' || asPath === '/' || asPath === 'index' ? 'home' : asPath
  console.log(JSON.stringify({ query }))
  console.log(JSON.stringify({ initSlug, asPath, pathname }))
  const initProps: OnInitialPagePropsHook = {
    overwriteDisableRobots: ['dev.', 'test.', 'preview.', 'prev.', 'beta.', 'localhost:'].some(i => host.startsWith(i)) || host.endsWith('.now.sh'),
    slug: initSlug as string,
    host,
    settingsPath: 'settings',
    rootDirectory: '', // en, de, etherhill
    categories: '' // need a leading "/"
  }
  StoryblokService.setQuery(query)

  const rest = projects[host]
  if (rest) {
    CONFIG = {
      ...CONFIG,
      ...rest
    }
    StoriesService.setConfig(rest)
    StoryblokService.initialize(rest)
  } else {
    throw Error(`config not found for host: ${host}`)
  }

  let knownLocale = undefined
  let isLandingPage = undefined
  let slugAsArray = Array.isArray(query.index) ? query.index : [query.index]
  if (asPath === '/') {
    slugAsArray = ['home']
  }
  let seoSlug = slugAsArray.join('/')
  if (seoSlug.endsWith('home')) {
    seoSlug = seoSlug.replace('home', '')
  }
  if (CONFIG.rootDirectory) {
    // if the first entry is not root directory append root directory
    slugAsArray[0] !== CONFIG.rootDirectory && slugAsArray.unshift(CONFIG.rootDirectory)
  } else if (CONFIG.suppressSlugLocale) {
    // suppress slug locale so remove any language key from the array (mainly for storyblok backend)
    if (CONFIG.languages.includes(slugAsArray[0])) {
      // first directory is a locale
      if (slugAsArray.length === 1) {
        // landing pages of locale
        knownLocale = slugAsArray[0]
        isLandingPage = true
        slugAsArray.push('home') // add 'home'
      } else if (slugAsArray.length === 2 && slugAsArray[1] === 'home') {
        // landing pages of locale (storyblok)
        knownLocale = slugAsArray[0]
        isLandingPage = true
      } else {
        slugAsArray.shift() // remove locale from path
      }
    }
  } else if (CONFIG.languages.includes(slugAsArray[0])) {
    // activated multi lang handling
    knownLocale = slugAsArray[0]
    if (slugAsArray.length === 1) {
      slugAsArray.push('home')
    }
  }

  const pageSlug = slugAsArray.join('/')
  console.log('SLUG ARRAY PAGE:', pageSlug)

  // start locale handling
  DeviceDetectService.setAppServices(req) // important to call first, webp is depending on this
  try {
    let { page, settings, categories = [], stories = [], locale } = await apiRequestResolver({
      pageSlug,
      locale: knownLocale,
      isLandingPage,
      CONFIG
    })

    if (CONFIG.defaultLocale && !locale) {
      locale = CONFIG.defaultLocale
    }

    if (CONFIG.overwriteLocale) {
      locale = CONFIG.overwriteLocale
    }

    const url = `https://${host}${seoSlug ? `/${seoSlug}` : ''}` // for seo purpose
    const pageProps: PageStoryblok = (page && page.data && page.data.story && page.data.story.content) || null
    const settingsProps: GlobalStoryblok = settings && settings.data && settings.data.story && settings.data.story.content
    if (CONFIG.languages.length) {
      DeviceDetectService.setLanguage(locale, CONFIG.languages, res)
    }
    let pageSeo: PageSeoProps = {
      url: url,
      disableRobots: initProps.overwriteDisableRobots || !!pageProps.meta_robots,
      title: '',
      description: '',
      body: []
    }
    if (pageProps) {
      pageSeo = {
        ...pageSeo,
        title: pageProps.meta_title as string,
        description: pageProps.meta_description as string,
        body: pageProps.seo_body || []
      }
    }
    if (!(settingsProps && settingsProps._uid)) {
      console.log('SETTINGS MISSNG')
    }
    if (!pageProps) {
      console.log('PAGE MISSNG')
    }
    return {
      page: pageProps,
      settings: settingsProps,
      pageSeo,
      allStories: stories || [],
      allCategories: categories || [],
      locale,
      config: CONFIG,
      deviceService: {
        device: DeviceDetectService.getDevice(),
        hasWebpSupport: DeviceDetectService.getWebpSupport()
      }
    }
  } catch (e) {
    console.log(e)
    return returnBaseProps(e)
  }
}

export default getInitialPageProps
