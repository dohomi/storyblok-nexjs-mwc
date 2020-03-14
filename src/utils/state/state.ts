import { createGlobalState } from 'react-hooks-global-state'

export interface State {
  leftNavigationDrawer: boolean
  rightNavigationDrawer: boolean
  isScrollTop: boolean
  isScrollTriggered: boolean
  searchParams: {
    searchText: string | undefined
    categories: string[] | undefined
  }
  appSetup: {
    hasDrawer: boolean,
    hasFeatureImage: boolean,
    hasRightDrawer: boolean
  }
}

const initialState: State = {
  leftNavigationDrawer: false,
  rightNavigationDrawer: false,
  isScrollTop: true,
  isScrollTriggered: false,
  searchParams: {
    searchText: undefined,
    categories: undefined
  },
  appSetup: {
    hasDrawer: false,
    hasFeatureImage: false,
    hasRightDrawer: false
  }
}
const { setGlobalState, useGlobalState } = createGlobalState(initialState)


export { useGlobalState, setGlobalState }
