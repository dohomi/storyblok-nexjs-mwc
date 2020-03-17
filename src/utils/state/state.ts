import { createGlobalState } from 'react-hooks-global-state'
import { DrawerProps } from '@material-ui/core'

export interface State {
  leftNavigationDrawer: boolean
  rightNavigationDrawer: boolean
  searchParams: {
    searchText: string | undefined
    categories: string[] | undefined
  }
  appSetup: {
    hasDrawer?: boolean,
    hasFeatureImage?: boolean,
    hasRightDrawer?: boolean,
    drawerVariant?: DrawerProps['variant']
    drawerBelowToolbar?: boolean
    hasScrollCollapse?: boolean
    toolbarMainHeight?: string | number
  }
}

const initialState: State = {
  leftNavigationDrawer: false,
  rightNavigationDrawer: false,
  searchParams: {
    searchText: undefined,
    categories: undefined
  },
  appSetup: {
    hasDrawer: false,
    hasFeatureImage: false,
    hasRightDrawer: false,
    drawerVariant: 'temporary',
    drawerBelowToolbar: false,
    hasScrollCollapse: false,
    toolbarMainHeight: undefined
  }
}
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState(initialState)


export { useGlobalState, setGlobalState, getGlobalState }
