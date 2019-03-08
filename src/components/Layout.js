import Header from './Header'
import Footer from '../components/Footer'
import {ThemeProvider} from '@rmwc/theme'
import {base, dark} from '../utils/themes'
import React from 'react'
import MwcDrawer from './MwcDrawer'
import {withRouter} from 'next/router'
import PropTypes from 'prop-types'

class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.toggleFeature = this.toggleFeature.bind(this)
    this.state = {
      drawerOpen: false,
      hasFeature: this.props.hasFeature
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.router.asPath !== prevProps.router.asPath) {
      this.closeDrawer()
    }
    if (this.props.hasFeature !== prevProps.hasFeature) {
      this.toggleFeature()
    }
  }

  toggleFeature () {
    this.setState({hasFeature: !this.state.hasFeature})
  }

  toggleDrawer () {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  closeDrawer () {
    this.setState({drawerOpen: false})
  }

  render () {

    return (
      <ThemeProvider options={base}>
        <MwcDrawer content={this.props.settings}
                   isDrawerOpen={this.state.drawerOpen}
                   onDrawerClose={this.closeDrawer}/>
        <Header settings={this.props.settings}
                hasFeature={this.state.hasFeature}
                onNav={this.toggleDrawer}/>
        <div className="util__container">
          {this.props.children}
        </div>
        <Footer settings={this.props.settings}/>
      </ThemeProvider>
    )
  }
}

Layout.propTypes = {
  settings: PropTypes.object,
  hasFeature: PropTypes.bool
}

export default withRouter(Layout)
