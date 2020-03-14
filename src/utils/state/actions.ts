import { setGlobalState } from './state'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'

export const toggleLeftNavigation = () => {
  setGlobalState('leftNavigationDrawer', value => !value)
}
export const toggleRightNavigation = () => {
  setGlobalState('rightNavigationDrawer', value => !value)
}

export const closeNavigationDrawers = () => {
  setGlobalState('leftNavigationDrawer', false)
  setGlobalState('rightNavigationDrawer', false)
}

export const setAppSetup = ({ page, settings }: { page: PageStoryblok, settings: GlobalStoryblok }) => {
  setGlobalState('appSetup', (opts) => ({
    ...opts,
    hasDrawer: Array.isArray(settings.drawer_body) && settings.drawer_body.length > 0,
    hasFeatureImage: Array.isArray(page.property) && page.property.includes('has_feature'),
    hasRightDrawer: Array.isArray(page.right_body) && page.right_body.length > 0,
    drawerVariant: settings.drawer_variant
  }))
}

const addSearchParamsToUrl = ({ categories, searchText }: { categories?: string[], searchText?: string }) => {
  const currentUrl = new URL(window.location.href)
  if (categories) {
    currentUrl.searchParams.delete('search__categories')
    categories.forEach((category: string) => {
      currentUrl.searchParams.append('search__categories', category)
    })
  }
  if (searchText !== undefined) {
    if (!searchText) {
      currentUrl.searchParams.delete('search__text')
    } else {
      currentUrl.searchParams.set('search__text', searchText)
    }
  }
  window.history.pushState({ path: currentUrl.href }, '', currentUrl.href)
  window.scrollTo(0, 0)
}

export const onSearchTextChange = (searchText: string) => {
  setGlobalState('searchParams', (v) => ({
    ...v,
    searchText
  }))
  addSearchParamsToUrl({ searchText })
}

export const setSearchCategory = (categories: string[]) => {
  setGlobalState('searchParams', (v) => ({
    ...v,
    categories
  }))
  addSearchParamsToUrl({ categories })
}

export const setScrollTop = (value: boolean) => {
  setGlobalState('isScrollTop', value)
}

export const setScrollTriggered = (value: boolean) => {
  setGlobalState('isScrollTriggered', value)
}
