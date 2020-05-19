import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import StoryblokService from '../src/utils/StoryblokService'
import React from 'react'
import { CONFIG } from '../src/utils/config'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { getGlobalState } from '../src/utils/state/state'
import { GlobalStoryblok } from '../src/typings/generated/components-schema'


class CoreDocument extends Document {
  render() {
    const locale = getGlobalState('locale')

    // @ts-ignore
    const { isProduction } = this.props
    const settings: GlobalStoryblok | undefined = this.props.__NEXT_DATA__.props?.settings

    const googleAnalyticsId = CONFIG.GA || settings?.setup_google_analytics
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
      {isProduction && googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script dangerouslySetInnerHTML={{__html:`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${CONFIG.GA}');
      `}} />
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
    isProduction: !StoryblokService.insideVisualComposer() && process.env.NODE_ENV === 'production',
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}

export default CoreDocument
