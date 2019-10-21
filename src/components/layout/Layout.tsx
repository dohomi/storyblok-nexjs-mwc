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

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  asPath: string
  hasFeature: boolean
  hasRightDrawer: boolean
}

const Layout: FunctionComponent<LayoutComponentProps> = ({ asPath, settings, children, hasFeature, hasRightDrawer }) => {

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
                  hasRightDrawer={hasRightDrawer}
                  hasFeature={hasFeature} />
          {children}
          <Footer settings={settings} />
        </ThemeProvider>
      </WindowDimensionsProvider>
    </GlobalStateProvider>
  )
}

export default Layout
