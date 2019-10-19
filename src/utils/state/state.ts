import { createGlobalState } from 'react-hooks-global-state'

interface State {
  leftNavigationDrawer: boolean
  megaMenu: any
  searchParams: {
    searchText: string
    categories: string[]
  }
}

const initialState: State = {
  leftNavigationDrawer: false,
  megaMenu: {},
  searchParams: {
    searchText: '',
    categories: []
  }
}
const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState(initialState)


export { GlobalStateProvider, useGlobalState, setGlobalState }
