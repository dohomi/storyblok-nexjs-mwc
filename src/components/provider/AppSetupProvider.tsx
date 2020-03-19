import * as React from 'react'
import { createContext, FunctionComponent, useContext, useMemo } from 'react'
import { DrawerProps } from '@material-ui/core'
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from './WindowDimensionsProvider'

export type AppSetupProps = {
  hasDrawer?: boolean,
  hasFeatureImage?: boolean,
  hasRightDrawer?: boolean,
  drawerVariant?: DrawerProps['variant']
  drawerBelowToolbar?: boolean
  hasScrollCollapse?: boolean
  toolbarMainHeight?: string | number
  drawerFullWidthMobile?: boolean
}

const defaultValue: AppSetupProps = {
  hasDrawer: false,
  hasFeatureImage: false,
  hasRightDrawer: false,
  drawerVariant: 'temporary',
  drawerBelowToolbar: false,
  hasScrollCollapse: false
}
const AppSetupContext = createContext(defaultValue)

const AppSetupProvider: FunctionComponent<{
  settings: GlobalStoryblok
  page?: PageStoryblok
}> = ({ children, settings, page }) => {
  const { isMobile } = useWindowDimensions()
  const value = useMemo<AppSetupProps>(
    () => {
      let drawerVariant: DrawerProps['variant'] = isMobile && settings.drawer_below_toolbar_xs ? 'persistent' : 'temporary'
      if (!isMobile) {
        drawerVariant = settings.drawer_below_toolbar ? 'persistent' : settings.drawer_variant || 'temporary'
      }

      return {
        hasDrawer: !!(Array.isArray(settings.drawer_body) && settings.drawer_body.length > 0),
        hasFeatureImage: page && Array.isArray(page.property) && page.property.includes('has_feature'),
        hasRightDrawer: page && Array.isArray(page.right_body) && page.right_body?.length > 0,
        hasScrollCollapse: !!(settings.toolbar_config && settings.toolbar_config.includes('scroll_collapse')),
        toolbarMainHeight: settings.toolbar_main_height,
        drawerVariant: drawerVariant,
        drawerBelowToolbar: settings.drawer_below_toolbar_xs || settings.drawer_below_toolbar,
        drawerFullWidthMobile: !!settings.drawer_full_width_mobile
      }
    },
    [isMobile]
  )
  return (
    <AppSetupContext.Provider value={value}>
      {children}
    </AppSetupContext.Provider>
  )
}

export const useAppSetup = () => useContext(AppSetupContext)

export default AppSetupProvider
