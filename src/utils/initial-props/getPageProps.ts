import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'
import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../StoriesService'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'

const getPageProps = async (slug: string | string[]) => {
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
  return {
    page: pageProps,
    settings: settingsProps,
    allStories: stories,
    allCategories: categories,
    allStaticContent: staticContent,
    locale
  }
}

export default getPageProps
