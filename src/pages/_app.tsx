import React from 'react'
import App from 'next/app'

import '../src/assets/scss/Layout.scss'


class MyApp extends App {

  render () {
    const {Component, pageProps} = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

// need to check if its still needed.. maybe move layout to this component!
// MyApp.getInitialProps = async ({Component, ctx}) => {
//   let pageProps = {}
//
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }
//
//   return {pageProps}
// }

export default MyApp
