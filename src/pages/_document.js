import Document, {Head, Main, NextScript} from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import WebpService from '../utils/WebpService'
import DeviceDetectService from '../utils/DeviceDetectService'
import NextHead from '../components/layout/Head'

class MyDocument extends Document {
  render () {
    // Todo: set lang of html

    const injectBodyScript = {
      __html: `
      var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}'; 
      var userDevice = ${JSON.stringify(DeviceDetectService.getDevice())};
      var hasWebpSupport = ${WebpService.getWebpSupport()};`
    }
    return (
      <html>
      <Head/>
      <body className="mdc-typography mdc-theme--background">
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
