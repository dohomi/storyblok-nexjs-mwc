import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'
import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../config'
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
  const pageProps: PageStoryblok = page?.data?.story?.content
  const settingsProps: GlobalStoryblok = settings?.data?.story?.content

  if (!settings) {
    console.log('SETTINGS MISSNG')
  } else if (!pageProps) {
    console.log('PAGE MISSNG')
  }
  return {
    page: pageProps ? { ...pageProps, uuid: page?.data?.story?.uuid } : null,
    settings: settingsProps ? { ...settingsProps, uuid: settings?.data?.story?.uuid } : null,
    allStories: stories,
    allCategories: categories,
    allStaticContent: staticContent,
    locale
  }
}

export default getPageProps
