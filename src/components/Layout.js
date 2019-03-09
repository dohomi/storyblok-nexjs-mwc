import Header from './Header'
import Footer from '../components/Footer'
import {ThemeProvider} from '@rmwc/theme'
import * as themeLayout from '../utils/themeLayout' // todo make
import React, {useState, useEffect} from 'react'
import MwcDrawer from './MwcDrawer'
import {withRouter} from 'next/router'
import PropTypes from 'prop-types'


const Layout = (props) => {
  let [drawer, setDrawer] = useState(false)

  useEffect(() => {
    closeDrawer()
  }, [props.router])

  function closeDrawer () {
    setDrawer(false)
  }

  function toggleDrawer () {
    setDrawer(!drawer)
  }

  let settings = props.settings
  const themeOptions = themeLayout[settings.theme_base || 'base']
  settings.theme_primary && (themeOptions.primary = settings.theme_primary)
  settings.theme_secondary && (themeOptions.secondary = settings.theme_secondary)
  return (
    <ThemeProvider options={themeOptions} className="app__root">
      <MwcDrawer content={settings}
                 isDrawerOpen={drawer}
                 onDrawerClose={closeDrawer}/>
      <Header settings={settings}
              hasFeature={props.hasFeature}
              onNav={toggleDrawer}/>
      <div className="util__container">
        {props.children}
      </div>
      <Footer settings={settings}/>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  settings: PropTypes.object,
  hasFeature: PropTypes.bool
}

export default withRouter(Layout)
