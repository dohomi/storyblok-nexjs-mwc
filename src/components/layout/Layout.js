import Header from './toolbar/Header'
import Footer from './Footer'
import {ThemeProvider} from '@rmwc/theme'
import React, {useState, useEffect} from 'react'
import MwcDrawer from './MwcDrawer'
import {withRouter} from 'next/router'
import PropTypes from 'prop-types'
import {getThemeOptions} from '../../utils/themeLayout'


const Layout = ({router, settings = {}, children, hasFeature}) => {
  let [drawer, setDrawer] = useState(false)

  useEffect(
    () => {
      closeDrawer()
    },
    [router.asPath]
  )

  function closeDrawer () {
    setDrawer(false)
  }

  function toggleDrawer () {
    setDrawer(!drawer)
  }

  return (
    <ThemeProvider options={getThemeOptions(settings)} className="app__root">
      <MwcDrawer content={settings}
                 isDrawerOpen={drawer}
                 onDrawerClose={closeDrawer}/>
      <Header settings={settings}
              hasFeature={hasFeature}
              onNav={toggleDrawer}/>
      <main>{children}</main>
      <Footer settings={settings}/>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  settings: PropTypes.object,
  hasFeature: PropTypes.bool
}

export default withRouter(Layout)
