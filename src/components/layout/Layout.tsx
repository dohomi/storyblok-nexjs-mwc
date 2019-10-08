import Header from './toolbar/Header'
import Footer from './Footer'
import { ThemeProvider } from '@rmwc/theme'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { getThemeOptions } from '../../utils/themeLayout'
import { GlobalStateProvider } from '../../utils/state/state'
import { closeNavigationDrawers } from '../../utils/state/actions'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

type LayoutProps = {
  hasFeature?: boolean
  settings: GlobalStoryblok
  asPath?: string
}

const Layout: FunctionComponent<LayoutProps> = ({ asPath = '', settings = {}, children, hasFeature }) => {

  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
  )

  return (
    <GlobalStateProvider>
      <ThemeProvider options={getThemeOptions(settings)} className="app__root">
        <MwcDrawer content={settings} />
        <Header settings={settings}
                hasFeature={hasFeature} />
        <main>{children}</main>
        <Footer settings={settings} />
      </ThemeProvider>
    </GlobalStateProvider>
  )
}

export default Layout
