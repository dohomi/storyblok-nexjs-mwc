import { NextPageContext } from 'next'
import StoryblokService from '../../utils/StoryblokService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps, PageSeoProps } from '../parsePageProperties'
import { CONFIG } from '../StoriesService'
import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { getBaseProps } from '@initialData/getBaseProps'
import hasWebpSupport from '../detectWebpSupport'
import deviceDetect from '../deviceDetect'
import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'


const getInitialPageProps = async (ctx: NextPageContext): Promise<AppPageProps> => {
  const { query, req, res } = ctx
  const host: string = req ? req.headers.host as string : window.location.host
  StoryblokService.setQuery(query)

  const { isLandingPage, knownLocale, pageSlug, seoSlug } = prepareForStoryblok(query.index)


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
    if (CONFIG.languages.length && req && res) {
      res.setHeader('Content-Language', Array.isArray(CONFIG.languages) ? CONFIG.languages.join(',') : CONFIG.languages)
      // todo check existence of language
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
      res && (res.statusCode = 500)
      console.log('SETTINGS MISSNG')
    } else if (!pageProps) {
      res && (res.statusCode = 404)
      console.log('PAGE MISSNG')
    } else if (res && !StoryblokService.insideVisualComposer()) {
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    }
    const hasWebp = await hasWebpSupport(req)
    return {
      page: pageProps,
      settings: settingsProps,
      pageSeo,
      allStories: stories,
      allCategories: categories,
      allStaticContent: staticContent,
      locale,
      hasWebpSupport: hasWebp,
      device: deviceDetect(req)
    }
  } catch (e) {
    console.log(e)
    return getBaseProps(e, req)
  }
}

export default getInitialPageProps
