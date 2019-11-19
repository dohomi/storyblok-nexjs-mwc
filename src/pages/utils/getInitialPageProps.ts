import { NextPageContext } from 'next'
import StoryblokService from '../../utils/StoryblokService'
import DeviceDetectService from '../../utils/DeviceDetectService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps, PageSeoProps } from '../../utils/parsePageProperties'
import CONFIG from '@config'

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
  locale: ''
})

const getInitialPageProps = async (ctx: NextPageContext): Promise<AppPageProps> => {
  const { query, req, res, pathname, asPath } = ctx
  const host: string = req ? req.headers.host as string : window.location.host
  const initSlug = asPath === '' || asPath === '/' || asPath === 'index' ? 'home' : asPath
  console.log(JSON.stringify({ query }))
  console.log(JSON.stringify({ initSlug, asPath, pathname }))
  const initProps = {
    overwriteDisableRobots: ['dev.', 'test.', 'preview.', 'prev.', 'beta.', 'localhost:'].some(i => host.startsWith(i)) || host.endsWith('.now.sh'),
    slug: initSlug as string,
    host,
    settingsPath: 'settings',
    rootDirectory: '', // need a trailing "/"
    categories: '', // need a leading "/"
    seoSlug: initSlug !== 'home' ? initSlug : '' // need to modify on languages and more
  }

  const filterStoriesAfterLang = { lang: 'default' }

  if (initProps.slug.match(/^.*\.[^\\]+$/)) {
    console.log('not found', query)
    // res.writeHead(301, {
    //   Location: slug
    // })

    return returnBaseProps({
      type: 'not_supported',
      url: initProps.slug
    })
  }
  const splitted = initProps.slug.split('/')
  const firstPathSegment = splitted[0]
  const secondPathSegment = splitted[1]
  const locale = CONFIG.languages.find(lang => lang === firstPathSegment) || ''
  if (locale) {
    if (CONFIG.storyblok.activatedLanguages && secondPathSegment && secondPathSegment !== locale) {
      initProps.slug = `${locale}/${initProps.slug}`
    }
    if (CONFIG.storyblok.activatedLanguages && !secondPathSegment) {
      initProps.slug = `${initProps.slug}/home`
    }
    initProps.settingsPath = CONFIG.storyblok.settingsInLangfolder ? `${locale}/${initProps.settingsPath}` : initProps.settingsPath
    filterStoriesAfterLang.lang = locale
  }
  StoryblokService.setQuery(query)
  if (typeof CONFIG.hooks.onInitialPageProps === 'function') {
    CONFIG.hooks.onInitialPageProps(initProps)
  }
  DeviceDetectService.setAppServices(req) // important to call first, webp is depending on this
  try {
    const settingsSlug = `cdn/stories/${initProps.rootDirectory}${initProps.settingsPath}`
    const pageSlug = `cdn/stories/${initProps.rootDirectory}${initProps.slug}`
    console.log(initProps, settingsSlug, pageSlug)
    let [page, settings, categories = [], stories = []] = await resolveAllPromises([
      StoryblokService.get(pageSlug),
      StoryblokService.get(settingsSlug),
      StoryblokService.getAll(`cdn/stories/${initProps.rootDirectory}`, {
        per_page: 100,
        sort_by: 'content.name:asc',
        filter_query: {
          'component': {
            'in': 'category'
          }
        }
      }),
      StoryblokService.getAll(`cdn/stories/${initProps.rootDirectory}`, {
        per_page: 100,
        excluding_fields: 'body,meta_robots,property,meta_title,meta_description,seo_body',
        sort_by: 'published_at:desc',
        filter_query: {
          'component': {
            'in': 'page'
          }
        }
      })
    ])
    const url = `https://${host}/${initProps.seoSlug}` // for seo purpose
    const pageProps: PageStoryblok = (page && page.data && page.data.story && page.data.story.content) || null
    const settingsProps: GlobalStoryblok = settings && settings.data && settings.data.story && settings.data.story.content
    DeviceDetectService.setLanguage(settingsProps.setup_language, settingsProps.setup_supported_languages, res)
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
