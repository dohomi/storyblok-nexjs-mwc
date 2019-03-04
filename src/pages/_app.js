import React from 'react'
import App, {Container} from 'next/app'
// import WebpService from '../src/utils/WebpService'
import NextSeo from 'next-seo'


class MyApp extends App {

  // currently not enabled
  // async componentDidMount () {
  //   WebpService.setWebpSupport()
  // }

  render () {
    const {Component, pageProps} = this.props
    const raw = {title: 'A Lumen Media Project'}
    return (
      <Container>
        <NextSeo config={raw}/>
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
