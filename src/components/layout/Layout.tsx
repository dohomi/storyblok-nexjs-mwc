import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { AppPageProps } from '../../utils/parsePageProperties'
import useGlobalStyles from '../../utils/useGlobalStyles'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  hasFeature: boolean
  hasRightDrawer: boolean
}


const Layout: FunctionComponent<LayoutComponentProps> = ({ settings, children, hasFeature, hasRightDrawer }) => {
  useGlobalStyles()
  console.log('inside of LAYOUT')
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
