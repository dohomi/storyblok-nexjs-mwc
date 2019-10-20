import { createGlobalState } from 'react-hooks-global-state'

interface State {
  leftNavigationDrawer: boolean
  megaMenu: any
  searchParams: {
    searchText: string | undefined
    categories: string[] | undefined
  }
}

const initialState: State = {
  leftNavigationDrawer: false,
  megaMenu: {},
  searchParams: {
    searchText: undefined,
    categories: undefined
  }
}
const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState(initialState)


export { GlobalStateProvider, useGlobalState, setGlobalState }
