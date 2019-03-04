import Document, {Head, Main, NextScript} from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import WebpService from '../utils/WebpService'

class MyDocument extends Document {
  render () {
    // Todo: set lang of html
    return (
      <html>
      <Head/>
      <body className="mdc-typography mdc-theme--background">
      <Main/>
      <script
        dangerouslySetInnerHTML={{__html: `var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}'; var hasWebpSupport = ${WebpService.getWebpSupport()}`}}></script>
      <NextScript/>
      </body>
      </html>
    )
  }
}

export default MyDocument
