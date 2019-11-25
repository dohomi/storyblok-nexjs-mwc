import { createGlobalState } from 'react-hooks-global-state'

interface State {
  leftNavigationDrawer: boolean
  rightNavigationDrawer: boolean
  megaMenu: any
  isScrollTop: boolean
  isScrollTriggered: boolean
  searchParams: {
    searchText: string | undefined
    categories: string[] | undefined
  }
}

const initialState: State = {
  leftNavigationDrawer: false,
  rightNavigationDrawer: false,
  megaMenu: {},
  isScrollTop: true,
  isScrollTriggered: false,
  searchParams: {
    searchText: undefined,
    categories: undefined
  }
}
const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState(initialState)


export { GlobalStateProvider, useGlobalState, setGlobalState }
