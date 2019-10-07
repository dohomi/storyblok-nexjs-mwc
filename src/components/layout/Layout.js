import Header from './toolbar/Header'
import Footer from './Footer'
import {ThemeProvider} from '@rmwc/theme'
import React, {useEffect} from 'react'
import MwcDrawer from './drawer/MwcDrawer'
import {withRouter} from 'next/router'
import PropTypes from 'prop-types'
import {getThemeOptions} from '../../utils/themeLayout'
import {GlobalStateProvider} from '../../utils/state/state'
import {closeNavigationDrawers} from '../../utils/state/actions'


const Layout = ({router, settings = {}, children, hasFeature}) => {

  useEffect(
    () => {
      closeNavigationDrawers() // todo needs testing might need a pure close drawer action
    },
    [router.asPath]
  )

  return (
    <GlobalStateProvider>
      <ThemeProvider options={getThemeOptions(settings)} className="app__root">
        <MwcDrawer content={settings} />
        <Header settings={settings}
                hasFeature={hasFeature} />
        <main>{children}</main>
        <Footer settings={settings} />
      </ThemeProvider>
    </GlobalStateProvider>
  )
}

Layout.propTypes = {
  settings: PropTypes.object,
  hasFeature: PropTypes.bool
}

export default withRouter(Layout)
