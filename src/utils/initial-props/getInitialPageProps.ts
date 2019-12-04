import { NextPageContext } from 'next'
import StoryblokService from '../../utils/StoryblokService'
import DeviceDetectService from '../../utils/DeviceDetectService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps, PageSeoProps } from '../parsePageProperties'
import { CONFIG } from '../StoriesService'
import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { getBaseProps } from '@initialData/getBaseProps'


const getInitialPageProps = async (ctx: NextPageContext): Promise<AppPageProps> => {
  const { query, req, res, asPath } = ctx
  const host: string = req ? req.headers.host as string : window.location.host
  StoryblokService.setQuery(query)

  let knownLocale = undefined
  let isLandingPage = undefined
  let slugAsArray = Array.isArray(query.index) ? query.index : [query.index]
  if (asPath === '/' || !asPath) {
    slugAsArray = ['home']
  }
  console.log('GET_INTIAL_PAGE_PROPS:', JSON.stringify({ query, asPath, slugAsArray }))
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
    let { page, settings, categories = [], stories = [], locale, staticContent = [] } = await apiRequestResolver({
      pageSlug,
      locale: knownLocale,
      isLandingPage
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
      disableRobots: CONFIG.overwriteDisableIndex || !!(pageProps && pageProps.meta_robots),
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
    if (res && !StoryblokService.insideVisualComposer()) {
      res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    }
    return {
      page: pageProps,
      settings: settingsProps,
      pageSeo,
      allStories: stories,
      allCategories: categories,
      allStaticContent: staticContent,
      locale
    }
  } catch (e) {
    console.log(e)
    return getBaseProps(e)
  }
}

export default getInitialPageProps
