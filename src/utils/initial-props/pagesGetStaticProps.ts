import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../StoriesService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { GetStaticProps } from 'next'
import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'


const pagesGetStaticProps: GetStaticProps = async ({ params, preview, previewData }) => {
  console.log('preview', params, preview, previewData)
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug

  try {
    const slug = params?.index || 'home'
    if (preview && Array.isArray(slug) && slug[0] === 'api') {
      // remove first entry (which is api)
      slug.shift()
    }
    console.log(preview)
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
        locale
      }
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetStaticProps
