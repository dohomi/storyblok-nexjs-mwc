import Header from './toolbar/Header'
import Footer from './Footer'
import React, { FunctionComponent, useEffect } from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import { closeNavigationDrawers } from '../../utils/state/actions'
import { AppPageProps } from '../../utils/parsePageProperties'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export type LayoutComponentProps = Pick<AppPageProps, 'settings'> & {
  asPath: string
  hasFeature: boolean
  hasRightDrawer: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    '.d-none': {
      display: 'none'
    },
    '.text-left': {
      textAlign: 'left'
    },
    '.text-center': {
      textAlign: 'center'
    },
    '.text-right': {
      textAlign: 'right'
    },
    'a.lm-link__button': {
      textDecoration: 'none',
      color: 'inherit'
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        position: 'fixed',
        background: theme.palette.primary.main,
        borderRadius: 0,
        zIndex: theme.zIndex.tooltip,
        top: 0,
        left: 0,
        width: '100%',
        height: 2
      },
      '& dd, & dt': {
        position: 'absolute',
        top: 0,
        height: 2,
        boxShadow: `${theme.palette.primary.main} 1px 0 6px 1px`,
        borderRadius: '100%',
        animation: 'nprogress-pulse 2s ease-out 0s infinite'
      },
      '& dd': {
        opacity: 0.6,
        width: 20,
        right: 0,
        clip: 'rect(-6px,22px,14px,10px)'
      },
      '& dt': {
        opacity: 0.6,
        width: 180,
        right: -80,
        clip: 'rect(-6px,90px,14px,-6px)'
      }
    },
    '@keyframes nprogress-pulse': {
      '30%': {
        opacity: 0.6
      },
      '60%': {
        opacity: 0
      },
      to: {
        opacity: 0.6
      }
    }
  }
}))

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
