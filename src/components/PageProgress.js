import React from 'react'
import Router from 'next/router'

class PageProgress extends React.Component {
  static defaultProps = {
    color: '#2299DD',
    showAfterMs: 300,
    spinner: true
  }

  timer = null

  constructor (parent) {
    super(parent)
  }

  routeChangeStart = () => {
    const {showAfterMs} = this.props
    clearTimeout(this.timer)
    this.timer = setTimeout(NProgress.start, showAfterMs)
  }

  routeChangeEnd = () => {
    clearTimeout(this.timer)
    NProgress.done()
  }

  componentDidMount () {
    const {options} = this.props

    if (options) {
      NProgress.configure(options)
    }

    Router.events.on('routeChangeStart', this.routeChangeStart)
    Router.events.on('routeChangeComplete', this.routeChangeEnd)
    Router.events.on('routeChangeError', this.routeChangeEnd)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
    Router.events.off('routeChangeStart', this.routeChangeStart)
    Router.events.off('routeChangeComplete', this.routeChangeEnd)
    Router.events.off('routeChangeError', this.routeChangeEnd)
  }

  render () {
    const {color, spinner} = this.props

    return (
      <div>some global spinner</div>
    )
  }
}
