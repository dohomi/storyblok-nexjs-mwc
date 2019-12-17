import Document, { DocumentContext, Head, Main, NextScript } from 'next/document'
import StoryblokService from '../utils/StoryblokService'
import React from 'react'
import StoriesService, { CONFIG } from '../utils/StoriesService'
import { ServerStyleSheets } from '@material-ui/core/styles'


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
    // @ts-ignore
    const { isProduction } = this.props

    return (
      <html lang={StoriesService.locale ? StoriesService.locale : CONFIG.defaultLocale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com/" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net/" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img2.storyblok.com/" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net/" />
        <link rel="dns-prefetch" href="https://img2.storyblok.com/" />
        {isProduction && CONFIG.GA && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com/" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.google-analytics.com/" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
            <link rel="dns-prefetch" href="https://www.google-analytics.com/" />
          </>
        )}
      </Head>
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
      </body>
      </html>
    )
  }
}

export default MyDocument
