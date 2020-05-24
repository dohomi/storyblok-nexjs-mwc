import React, { useEffect } from 'react'
import Router from 'next/router'
import { AppProps } from 'next/app'
import { CONFIG } from '../..'
import NProgress from 'nprogress'
import { AppPageProps } from '../../typings/app'

const trackGA = (url: string) => {
  if (CONFIG.GA && window !== undefined && window['gtag']) {
    window['gtag']('config', CONFIG.GA, {
      page_location: url,
      page_title: window.document.title
    })
  }
}

export function LmApp({ Component, pageProps }: AppProps<AppPageProps>) {

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      NProgress.done()
      trackGA(url)
    }
    const handleRouteStart = () => {
      NProgress.start()
    }
    const handleRouteError = () => {
      NProgress.done()
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeError', handleRouteError)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeError', handleRouteError)
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
