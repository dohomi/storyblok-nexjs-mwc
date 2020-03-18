import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent, memo, ReactNode } from 'react'
import AppHead from './AppHead'
import { getGlobalState, setGlobalState, State } from '../../utils/state/state'
import ExternalScripts from '../external-scripts/ExternalScripts'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import DrawerElement from './drawer/DrawerElement'

export type LayoutComponentProps = {
  appSetup?: State['appSetup'],
  settings: GlobalStoryblok
}

const setAppSetup = (appSetup: State['appSetup']) => {
  const oldState = getGlobalState('appSetup')

  if (JSON.stringify(oldState) !== JSON.stringify(appSetup)) {
    setGlobalState('appSetup', appSetup)
  }
}

const Layout: FunctionComponent<LayoutComponentProps> = ({
  children,
  appSetup,
  settings
}) => {
  const { isMobile } = useWindowDimensions()
  const drawerVariant = settings.drawer_variant

  setAppSetup({
    ...appSetup,
    drawerVariant: (isMobile ? 'temporary' : drawerVariant) || 'temporary',
    drawerBelowToolbar: (!isMobile && settings.drawer_below_toolbar)
  })

  // console.log('inside layout', isMobile, appSetup)

  return (
    <>
      <AppHead settings={settings} />
      <Header settings={settings} />
      {children}
      <DrawerElement settings={settings} />
      <Footer settings={settings} />
      <ExternalScripts />
    </>
  )
}

export default memo<LayoutComponentProps & { children: ReactNode }>(Layout)
