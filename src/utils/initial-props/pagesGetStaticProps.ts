import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../StoriesService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { PageSeoProps } from '../parsePageProperties'
import { GetStaticProps } from 'next'
import { prepareForStoryblok } from '@initialData/getInitialPageProps'

const pagesGetStaticProps: GetStaticProps = async ({ params, preview, previewData }) => {
  console.log('preview', params, preview, previewData)
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug

  try {
    const { isLandingPage, knownLocale, pageSlug, seoSlug } = prepareForStoryblok(params && params.index || 'home')


    let { page, settings, categories = [], stories = [], locale, staticContent = [] } = await apiRequestResolver({
      pageSlug,
      locale: knownLocale,
      isLandingPage: isLandingPage
    })

    if (CONFIG.defaultLocale && !locale) {
      locale = CONFIG.defaultLocale
    }

    if (CONFIG.overwriteLocale) {
      locale = CONFIG.overwriteLocale
    }

    const url = `https://${process.env.HOSTNAME}${seoSlug ? `/${seoSlug}` : ''}` // for seo purpose
    const pageProps: PageStoryblok = (page && page.data && page.data.story && page.data.story.content) || null
    const settingsProps: GlobalStoryblok = settings && settings.data && settings.data.story && settings.data.story.content

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
    } else if (!pageProps) {
      console.log('PAGE MISSNG')
    }
    // console.log('inside of static props', settingsProps)
    return {
      props: {
        page: pageProps,
        settings: settingsProps,
        pageSeo,
        allStories: stories,
        allCategories: categories,
        allStaticContent: staticContent,
        locale,
        hasWebpSupport: true, // todo
        device: {} // todo
      }
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetStaticProps
