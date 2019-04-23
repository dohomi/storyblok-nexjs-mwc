import {createGlobalState} from 'react-hooks-global-state'

const initialState = {
  leftNavigationDrawer: false,
  megaMenu: {}
}
const {GlobalStateProvider, setGlobalState, useGlobalState} = createGlobalState(initialState)

export const toggleLeftNavigation = () => {
  setGlobalState('leftNavigationDrawer', value => !value)
}

export const closeNavigationDrawers = () => {
  setGlobalState('leftNavigationDrawer', false)
}

export const setMegaMenu = (v, shouldClose) => {
  if (shouldClose) {
    setGlobalState('megaMenu', {[v]: false}) // close
  } else {
    setGlobalState('megaMenu', value => {
      const obj = {...value, [v]: !value[v]}
      console.log(obj)
      return obj
    }) // toggle
  }
}

export {GlobalStateProvider, useGlobalState}
