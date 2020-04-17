import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'
import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../config'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps } from '../../typings/app'

const getPageProps = async (slug: string | string[]): Promise<AppPageProps> => {
  const { isLandingPage, knownLocale, pageSlug } = prepareForStoryblok(slug)

  let { page, settings, allCategories = [], allStories = [], locale, allStaticContent = [] } = await apiRequestResolver({
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
  const pageProps = page?.data?.story?.content as PageStoryblok | undefined
  const settingsProps = settings?.data?.story?.content as GlobalStoryblok | undefined

  if (!settings) {
    console.log('SETTINGS MISSNG')
  } else if (!pageProps) {
    console.log('PAGE MISSNG')
  }
  return {
    page: pageProps ? { ...pageProps, uuid: page?.data?.story?.uuid } : null,
    settings: settingsProps ? { ...settingsProps, uuid: settings?.data?.story?.uuid } : null,
    allStories: allStories.filter(i => !i.full_slug.includes('demo-content')),
    allCategories,
    allStaticContent,
    locale
  }
}

export default getPageProps
