import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import DeviceDetectService from '../utils/DeviceDetectService'
import React from 'react'
import StoriesService from '../utils/StoriesService'
import CONFIG from '@config'

function getGoogleTagManager() {
  if (process.env.GTM_CONTAINER && process.env.NODE_ENV === 'production') {
    return {
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_CONTAINER}');`
    }
  }
  return null
}


class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const injectBodyScript = {
      __html: `
      var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}'; 
      var userDevice = ${JSON.stringify(DeviceDetectService.getDevice())};
      var hasWebpSupport = ${DeviceDetectService.getWebpSupport()};`
    }
    const GTM = !StoryblokService.insideVisualComposer() && getGoogleTagManager()

    return (
      <html lang={StoriesService.locale ? StoriesService.locale : CONFIG.defaultLang}>
      <Head></Head>
      <body className="mdc-typography mdc-theme--background">
      {GTM && (
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CONTAINER}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
      )}
      <Main />
      <script dangerouslySetInnerHTML={injectBodyScript}></script>

      <NextScript />
      {GTM && (
        <script dangerouslySetInnerHTML={GTM}></script>
      )}
      <script>
        /* fix FF initial render */
      </script>
      </body>
      </html>
    )
  }
}

export default MyDocument
