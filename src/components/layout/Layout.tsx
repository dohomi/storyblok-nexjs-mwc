import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { closeNavigationDrawers } from '../../utils/state/actions'
import { AppPageProps } from '../../utils/parsePageProperties'
import useGlobalStyles from '../../utils/useGlobalStyles'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  asPath: string
  hasFeature: boolean
  hasRightDrawer: boolean
}


const Layout: FunctionComponent<LayoutComponentProps> = ({ asPath, settings, children, hasFeature, hasRightDrawer }) => {
  useGlobalStyles(settings)
  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
  )

  return (
    <>
      <MwcDrawer content={settings} />
      <Header settings={settings}
              hasRightDrawer={hasRightDrawer}
              hasFeature={hasFeature} />
      {children}
      <Footer settings={settings} />
    </>
  )
}

export default Layout
