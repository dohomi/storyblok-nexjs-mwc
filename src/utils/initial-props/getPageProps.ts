import { CONFIG } from '../config'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps } from '../../typings/app'
import { prepareForStoryblok } from './prepareStoryblokRequest'
import { apiRequestResolver } from './storyblokDeliveryResolver'
import { collectComponentData } from './traversePageContent'

const getPageProps = async (slug: string | string[], ssrHostname?: string): Promise<AppPageProps> => {
  const { isLandingPage, knownLocale, pageSlug } = prepareForStoryblok(slug)

  let { page, settings, allCategories = [], allStories = [], locale, allStaticContent = [] } = await apiRequestResolver({
    pageSlug,
    locale: knownLocale,
    isLandingPage: isLandingPage,
    ssrHostname
  })

  if (CONFIG.defaultLocale && !locale) {
    locale = CONFIG.defaultLocale
  }

  if (CONFIG.overwriteLocale) {
    locale = CONFIG.overwriteLocale
  }

  // const url = `https://${process.env.HOSTNAME}${seoSlug ? `/${seoSlug}` : ''}` // for seo purpose
  const pageProps = page?.data?.story?.content as PageStoryblok | undefined
  const settingsProps = settings?.data?.story?.content as GlobalStoryblok | undefined

  if (!settings) {
    console.log('SETTINGS MISSNG')
  } else if (!pageProps) {
    console.log('PAGE MISSNG')
  }
  let componentData = null
  if (pageProps) {
    // traverse content and fetch list widget data
    componentData = await collectComponentData(pageProps, allCategories, allStories, knownLocale)
  }
  return {
    page: pageProps ? { ...pageProps, uuid: page?.data?.story?.uuid } : null,
    settings: settingsProps ? { ...settingsProps, uuid: settings?.data?.story?.uuid } : null,
    allCategories,
    allStaticContent,
    locale,
    listWidgetData: componentData || null
  }
}

export default getPageProps
