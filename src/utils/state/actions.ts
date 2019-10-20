import { setGlobalState } from './state'

export const toggleLeftNavigation = () => {
  setGlobalState('leftNavigationDrawer', value => !value)
}

export const closeNavigationDrawers = () => {
  setGlobalState('leftNavigationDrawer', false)
}

export const onSearchTextChange = (value: string) => {
  setGlobalState('searchParams', (v) => ({
    ...v,
    searchText: value
  }))
}
const addSearchParamsToUrl = ({ categories }: { categories?: string[] }) => {
  const currentUrl = new URL(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)
  if (categories && categories.length) {
    categories.forEach((cat: string) => {
      currentUrl.searchParams.append('search__categories', cat)
    })
  }
  window.history.pushState({ path: currentUrl.href }, '', currentUrl.href)
}

export const setSearchCategory = (categories: string[]) => {
  setGlobalState('searchParams', (v) => {
    return {
      ...v,
      categories
    }
  })
  addSearchParamsToUrl({ categories })
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
