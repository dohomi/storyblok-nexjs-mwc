import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../StoriesService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { GetStaticProps } from 'next'
import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'
import StoryblokService from '../StoryblokService'


const pagesGetStaticProps: GetStaticProps = async (props) => {
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
  const { params, previewData, preview } = props
  try {
    const slug = params?.index || 'home'

    if (previewData && previewData.query) {
      console.log('pagesGetStaticProps', slug, preview, props)
      StoryblokService.setQuery(previewData.query)
    }
    const { isLandingPage, knownLocale, pageSlug } = prepareForStoryblok(slug)


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

    // const url = `https://${process.env.HOSTNAME}${seoSlug ? `/${seoSlug}` : ''}` // for seo purpose
    const pageProps: PageStoryblok = (page && page.data && page.data.story && page.data.story.content) || null
    const settingsProps: GlobalStoryblok = settings && settings.data && settings.data.story && settings.data.story.content

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
        allStories: stories,
        allCategories: categories,
        allStaticContent: staticContent,
        locale,
        query: previewData?.query ? previewData.query : null
      }
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetStaticProps
