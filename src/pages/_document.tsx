import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import DeviceDetectService from '../utils/DeviceDetectService'
import React from 'react'
import StoriesService from '../utils/StoriesService'
import { ServerStyleSheets } from '@material-ui/core/styles'

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
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    }
  }

  render() {
    const GTM = !StoryblokService.insideVisualComposer() && getGoogleTagManager()

    return (
      <html lang={StoriesService.locale ? StoriesService.locale : StoriesService.config.defaultLocale}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              key="viewport" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" key="x-ua-compatible" />
      </Head>
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
      <script dangerouslySetInnerHTML={{
        __html: `
      var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}'; 
      var userDevice = ${JSON.stringify(DeviceDetectService.getDevice())};
      var hasWebpSupport = ${DeviceDetectService.getWebpSupport()};`
      }}></script>

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
