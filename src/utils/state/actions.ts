import { setGlobalState } from './state'

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

// todo this is used somewhere else.. or not in use any longer?
export const setMegaMenu = (v: any, shouldClose: any) => {
  if (shouldClose) {
    setGlobalState('megaMenu', { [v]: false }) // close
  } else {
    setGlobalState('megaMenu', (value: any) => {
      const obj = { ...value, [v]: !value[v] }
      console.log(obj)
      return obj
    }) // toggle
  }
}
