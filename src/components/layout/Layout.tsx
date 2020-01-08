import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { AppPageProps } from '../../utils/parsePageProperties'
import useAppScroll from '../../utils/hooks/useAppScroll'
import AppHead from './AppHead'
import useExternalScripts from '../../utils/hooks/useExternalScripts'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  hasFeature: boolean
  hasRightDrawer: boolean
}


const Layout: FunctionComponent<LayoutComponentProps> = ({ settings, children, hasFeature, hasRightDrawer }) => {

  useAppScroll({ settings })
  useExternalScripts()

  return (
    <>
      <AppHead settings={settings} />
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
