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

export const setMegaMenu = (v, value) => {
  setGlobalState('megaMenu', {[v]: value})
}

export {GlobalStateProvider, useGlobalState}
