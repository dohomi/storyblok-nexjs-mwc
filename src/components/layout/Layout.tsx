import Header from './toolbar/Header'
import Footer from './Footer'
import { ThemeProvider } from '@rmwc/theme'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { getThemeOptions } from '../../utils/themeLayout'
import { closeNavigationDrawers } from '../../utils/state/actions'
import { GlobalStateProvider } from '../../utils/state/state'
import WindowDimensionsProvider from '../provider/WindowDimensionsProvider'
import { AppPageProps } from '../../utils/parsePageProperties'

export type LayoutComponentProps = Pick<AppPageProps, 'settings' | 'hasFeature'> & {
  asPath: string
}

const Layout: FunctionComponent<LayoutComponentProps> = ({ asPath, settings, children, hasFeature }) => {

  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
  )

  const themeOptions = getThemeOptions(settings)
  return (
    <GlobalStateProvider>
      <WindowDimensionsProvider>
        <ThemeProvider options={themeOptions as any} className="app__root">
          <MwcDrawer content={settings} />
          <Header settings={settings}
                  hasFeature={!!hasFeature} />
          {children}
          <Footer settings={settings} />
        </ThemeProvider>
      </WindowDimensionsProvider>
    </GlobalStateProvider>
  )
}

export default Layout
