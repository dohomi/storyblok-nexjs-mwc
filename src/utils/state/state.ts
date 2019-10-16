import { createGlobalState } from 'react-hooks-global-state'

interface State {
  leftNavigationDrawer: boolean
  megaMenu: any
  searchParams: {
    slug: string
    categories: string[]
  }
}

const initialState: State = {
  leftNavigationDrawer: false,
  megaMenu: {},
  searchParams: {
    slug: '',
    categories: []
  }
}
const { GlobalStateProvider, setGlobalState, useGlobalState } = createGlobalState(initialState)


export { GlobalStateProvider, useGlobalState, setGlobalState }
