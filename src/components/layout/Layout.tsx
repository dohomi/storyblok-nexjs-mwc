import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { AppPageProps } from '../../utils/parsePageProperties'
import useAppScroll from '../../utils/useAppScroll'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  hasFeature: boolean
  hasRightDrawer: boolean
}


const Layout: FunctionComponent<LayoutComponentProps> = ({ settings, children, hasFeature, hasRightDrawer }) => {
  console.log('inside of LAYOUT')
  useAppScroll({ settings })
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
