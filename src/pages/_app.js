import React from 'react'
import App from 'next/app'

class MyApp extends App {

  render () {
    const {Component, pageProps} = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {pageProps}
}

export default MyApp
