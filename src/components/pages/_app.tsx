import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import DeviceDetectService from '../../utils/DeviceDetectService'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const { deviceService } = pageProps
  DeviceDetectService.reinitAppServices(deviceService) // todo we need it here or move?
  useEffect(
    () => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
        jssStyles.parentNode!.removeChild(jssStyles)
      }
      DeviceDetectService.setAppServices()
    },
    []
  )

  console.log('inside of _app')
  return <Component {...pageProps} />
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
