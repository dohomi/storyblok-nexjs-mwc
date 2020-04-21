import React from 'react'
import { AppProps } from 'next/app'
import { getGlobalState, setGlobalState } from '../utils/state/state'
import hasWebpSupport from '../utils/detectWebpSupport'

function CustomApp({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined') {
    console.log('inside of custom app', pageProps)
  }
  if (pageProps.locale && getGlobalState('locale') !== pageProps.locale) {
    setGlobalState('locale', pageProps.locale)
  }
  if (typeof getGlobalState('hasWebpSupport') === 'undefined') {
    hasWebpSupport()
      .then((has) => setGlobalState('hasWebpSupport', has))
  }

  return <Component {...pageProps} />
}

export default CustomApp
