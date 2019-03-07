import React from 'react'
import App, {Container} from 'next/app'
// import WebpService from '../src/utils/WebpService'

class MyApp extends App {

  // currently not enabled
  // async componentDidMount () {
  //   WebpService.setWebpSupport()
  // }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
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
