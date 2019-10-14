import Header from './toolbar/Header'
import Footer from './Footer'
import { ThemeProvider } from '@rmwc/theme'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { getThemeOptions } from '../../utils/themeLayout'
import { closeNavigationDrawers } from '../../utils/state/actions'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

type LayoutProps = {
  hasFeature?: boolean
  settings: GlobalStoryblok
  asPath?: string
}

const Layout: FunctionComponent<LayoutProps> = ({ asPath, settings, children, hasFeature }) => {

  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
  )

  const themeOptions = getThemeOptions(settings)
  return (
    <ThemeProvider options={themeOptions as any} className="app__root">
      <MwcDrawer content={settings} />
      <Header settings={settings}
              hasFeature={!!hasFeature} />
      <main>{children}</main>
      <Footer settings={settings} />
    </ThemeProvider>
  )
}

export default Layout
