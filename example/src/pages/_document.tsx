import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { GlobalStoryblok } from 'lumen-cms-core/src/typings/generated/components-schema'
import {LmStoryblokService} from 'lumen-cms-core'

class CoreDocument extends Document {
  render() {

    // @ts-ignore
    const { isProduction } = this.props
    const settings: GlobalStoryblok | undefined = this.props.__NEXT_DATA__.props?.settings

    const googleAnalyticsId = settings?.setup_google_analytics
    const locale = settings?.setup_language || process.env.defaultLocale || 'en'

    return (
      <html lang={locale}>
      <Head />
      <body className="lm-body__root">
      <Main />
      <script dangerouslySetInnerHTML={{
        __html: `
      var StoryblokCacheVersion = '${LmStoryblokService.getCacheVersion()}';`
      }}></script>
      <NextScript />
      {isProduction && googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `
          }} />
        </>
      )}
      {LmStoryblokService.insideVisualComposer() && (
        <script src={`//app.storyblok.com/f/storyblok-latest.js?t=${LmStoryblokService.getToken()}`}></script>
      )}
      </body>
      </html>
    )
  }
}

CoreDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    isProduction: !LmStoryblokService.insideVisualComposer() && process.env.NODE_ENV === 'production',
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

export default CoreDocument
