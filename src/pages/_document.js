import Document, {Head, Main, NextScript} from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import WebpService from '../utils/WebpService'
import DeviceDetectService from '../utils/DeviceDetectService'

function getGoogleTagManager () {
  if (process.env.GTM_CONTAINER && process.env.NODE_ENV !== 'production') {
    return {
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-${process.env.GTM_CONTAINER}');`
    }
  }
  return null
}


class MyDocument extends Document {
  render () {
    // Todo: set lang of html
    const injectBodyScript = {
      __html: `
      var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}'; 
      var userDevice = ${JSON.stringify(DeviceDetectService.getDevice())};
      var hasWebpSupport = ${WebpService.getWebpSupport()};`
    }
    const GTM = getGoogleTagManager()

    return (
      <html>
      <Head>
        {GTM && (
          <script dangerouslySetInnerHTML={GTM}></script>
        )}
      </Head>
      <body className="mdc-typography mdc-theme--background">
      {GTM && (
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CONTAINER}`} height="0"
                  width="0"
                  style="display:none;visibility:hidden"></iframe>
        </noscript>
      )}
      <Main/>
      <script dangerouslySetInnerHTML={injectBodyScript}></script>
      <script crossOrigin="anonymous"
              src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default,IntersectionObserver,fetch"
              key="polyfill"></script>
      <NextScript/>
      </body>
      </html>
    )
  }
}

export default MyDocument
