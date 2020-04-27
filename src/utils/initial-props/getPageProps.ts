import { prepareForStoryblok } from '@initialData/prepareStoryblokRequest'
import { apiRequestResolver } from '@initialData/storyblokDeliveryResolver'
import { CONFIG } from '../config'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { AppPageProps } from '../../typings/app'
import { collectComponentData } from '@initialData/traversePageContent'

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
  let componentData = null
  if (pageProps) {
    // traverse content and fetch list widget data
    componentData = await collectComponentData(pageProps, allCategories, allStories, knownLocale)
  }
  return {
    page: pageProps ? { ...pageProps, uuid: page?.data?.story?.uuid } : null,
    settings: settingsProps ? { ...settingsProps, uuid: settings?.data?.story?.uuid } : null,
    allStories: [] /*(allStories || []).filter(i => !i.full_slug.includes('demo-content')).map(i => ({
      full_slug: i.full_slug,
      uuid: i.uuid,
      created_at: i.created_at,
      published_at: i.published_at,
      name: i.name,
      tag_list: i.tag_list,
      content: i.content
    }))*/,
    allCategories: (allCategories || []).map(i => ({
      uuid: i.uuid,
      content: i.content,
      tag_list: i.tag_list
    })),
    allStaticContent,
    locale,
    listWidgetData: componentData || null
  }
}

export default getPageProps
