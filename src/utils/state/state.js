import {createGlobalState} from 'react-hooks-global-state'

const initialState = {
  leftNavigationDrawer: false
}
const {GlobalStateProvider, setGlobalState, useGlobalState} = createGlobalState(initialState)

export const toggleLeftNavigation = () => {
  setGlobalState('leftNavigationDrawer', value => !value)
}

export const closeNavigationDrawers = () => {
  setGlobalState('leftNavigationDrawer', false)
}

export {GlobalStateProvider, useGlobalState}
