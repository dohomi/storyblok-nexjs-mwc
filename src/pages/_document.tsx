import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import React from 'react'
import { CONFIG } from '../utils/config'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { getGlobalState } from '../utils/state/state'


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
      isProduction: !StoryblokService.insideVisualComposer() && process.env.NODE_ENV === 'production',
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    }
  }

  setGoogleGTag() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${CONFIG.GA}');
      `
    }
  }

  render() {
    const locale = getGlobalState('locale')

    // @ts-ignore
    const { isProduction } = this.props

    return (
      <html lang={locale}>
      <Head />
      <body className="lm-body__root">
      <Main />
      <script dangerouslySetInnerHTML={{
        __html: `
      var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}';`
      }}></script>
      <NextScript />
      {isProduction && CONFIG.GA && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA}`}
          />
          <script dangerouslySetInnerHTML={this.setGoogleGTag()} />
        </>
      )}
      {StoryblokService.insideVisualComposer() && (
        <script src={`//app.storyblok.com/f/storyblok-latest.js?t=${StoryblokService.getToken()}`}></script>
      )}
      </body>
      </html>
    )
  }
}

export default MyDocument
