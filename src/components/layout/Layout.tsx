import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { closeNavigationDrawers } from '../../utils/state/actions'
import { AppPageProps } from '../../utils/parsePageProperties'
import { makeStyles } from '@material-ui/core/styles'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  asPath: string
  hasFeature: boolean
  hasRightDrawer: boolean
}

const useStyles = makeStyles({
  '@global': {
    '.d-none': {
      display: 'none'
    },
    '.text-center': {
      textAlign: 'center'
    },
    'a.lm-link__button':{
      textDecoration: 'none',
      color: 'inherit'
    }
  }
})

const Layout: FunctionComponent<LayoutComponentProps> = ({ asPath, settings, children, hasFeature, hasRightDrawer }) => {
  useStyles()
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
