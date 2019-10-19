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

export const addSearchCategory = (value: string) => {
  setGlobalState('searchParams', (v) => ({
    ...v,
    categories: [...v.categories, value]
  }))
}

export const removeSearchCategory = (value: string) => {
  setGlobalState('searchParams', (v) => ({
    ...v,
    categories: v.categories.filter(item => item !== value)
  }))
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
