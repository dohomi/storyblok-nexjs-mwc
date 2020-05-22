import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent } from 'react'
import AppHead from './AppHead'
import ExternalScripts from '../external-scripts/ExternalScripts'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import DrawerElement from './drawer/DrawerElement'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LayoutComponentProps = CoreComponentProps & {
  // appSetup?: State['appSetup'],
  settings: GlobalStoryblok
}

const Layout: FunctionComponent<LayoutComponentProps> = ({
  children,
  // appSetup,
  settings,
  ComponentRender
}) => {

  // console.log('layout render')
  return (
    <>
      <AppHead settings={settings} />
      <Header settings={settings} ComponentRender={ComponentRender} />
      {children}
      <DrawerElement settings={settings} />
      <Footer settings={settings} ComponentRender={ComponentRender} />
      <ExternalScripts settings={settings} />
    </>
  )
}

// export default memo<{children: ReactNode, settings:GlobalStoryblok}>(Layout)
export default Layout
