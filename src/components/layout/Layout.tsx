import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { AppPageProps } from '../../utils/parsePageProperties'
import useAppScroll from '../../utils/hooks/useAppScroll'
import AppHead from './AppHead'
import useExternalScripts from '../../utils/hooks/useExternalScripts'
import { useRouter } from 'next/router'
import { closeNavigationDrawers } from '../../utils/state/actions'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  hasFeature: boolean
  hasRightDrawer: boolean
}


const Layout: FunctionComponent<LayoutComponentProps> = ({ settings, children, hasFeature, hasRightDrawer }) => {

  useAppScroll({ settings, hasFeature })
  useExternalScripts()
  const router = useRouter()
  const { asPath } = router
  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [asPath]
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
