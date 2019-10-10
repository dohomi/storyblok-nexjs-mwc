import { setGlobalState } from './state'

export const toggleLeftNavigation = () => {
  setGlobalState('leftNavigationDrawer', value => !value)
}

export const closeNavigationDrawers = () => {
  setGlobalState('leftNavigationDrawer', false)
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
