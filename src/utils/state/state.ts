import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  leftNavigationDrawer: false,
  megaMenu: {}
}
const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState(initialState)


export { GlobalStateProvider, useGlobalState, setGlobalState }
