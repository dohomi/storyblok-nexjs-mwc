import React, { useEffect } from 'react'
import WindowDimensionsProvider from '../provider/WindowDimensionsProvider'
import GlobalTheme from '../global-theme/GlobalTheme'
import { GlobalStateProvider } from '../../utils/state/state'
import { CssBaseline } from '@material-ui/core'
import { AppProps } from 'next/app'
import { NextPage } from 'next'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(
    () => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
        jssStyles.parentNode!.removeChild(jssStyles)
      }
    },
    []
  )

  const { settings } = pageProps
  return (
    <GlobalStateProvider>
      <WindowDimensionsProvider>
        <GlobalTheme settings={settings}>
          <CssBaseline />
          <Component {...pageProps} />
        </GlobalTheme>
      </WindowDimensionsProvider>
    </GlobalStateProvider>
  )

}

// need to check if its still needed.. maybe move layout to this component!
MyApp.getInitialProps = async ({ Component, ctx }: any): Promise<any> => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}

export default MyApp
