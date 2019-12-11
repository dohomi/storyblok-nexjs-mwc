import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { AppPageProps } from '../../utils/parsePageProperties'
import useAppScroll from '../../utils/hooks/useAppScroll'
import AppHead from './AppHead'
import useExternalScripts from '../../utils/hooks/useExternalScripts'
import DeviceDetectService from '../../utils/DeviceDetectService'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  hasFeature: boolean
  hasRightDrawer: boolean
}


const Layout: FunctionComponent<LayoutComponentProps> = ({ settings, children, hasFeature, hasRightDrawer }) => {
  console.log('inside of LAYOUT')
  useAppScroll({ settings })
  useExternalScripts()
  useEffect(
    () => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
        jssStyles.parentNode!.removeChild(jssStyles)
      }

      if (typeof window !== 'undefined') {
        DeviceDetectService.setAppServices()
      }
    },
    []
  )
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
