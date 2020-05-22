import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import LmStoryblokService from '../../utils/StoryblokService'
import React from 'react'
import { CONFIG } from '../../utils/config'
import { AppPageProps } from '../../typings/app'
import { ServerStyleSheets } from '@material-ui/core/styles'

type CoreDocumentProps = {
  props: AppPageProps
  isDevelopment: boolean
}

export function LmCoreDocument({ props, isDevelopment }: CoreDocumentProps): JSX.Element {
  const { settings, insideStoryblok } = props
  const googleAnalyticsId = settings?.setup_google_analytics || CONFIG.GA
  const locale = settings?.setup_language || CONFIG.defaultLocale
  return (
    <Html lang={locale ? locale : undefined}>
      <Head />
      <body className="lm-body__root">
      <Main />
      <script dangerouslySetInnerHTML={{
        __html: `
      var StoryblokCacheVersion = '${LmStoryblokService.getCacheVersion()}';`
      }}></script>
      <NextScript />
      {!isDevelopment && googleAnalyticsId && (
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
        gtag('config', '${googleAnalyticsId}', {
          page_path: window.location.pathname
        });
      `
          }} />
        </>
      )}
      {insideStoryblok && (
        <script src={`//app.storyblok.com/f/storyblok-latest.js?t=${CONFIG.previewToken}`}></script>
      )}
      </body>
    </Html>
  )
}

export async function documentGetInitialProps(ctx: DocumentContext) {
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
