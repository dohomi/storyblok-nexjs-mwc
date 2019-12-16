import imageService from '../../utils/ImageService'
import StoryblokService from '../../utils/StoryblokService'
import NextHead from 'next/head'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import { getFontBasedOnSetting } from '../../utils/parseFont'
import Router from 'next/router'
import NProgress from 'nprogress'
import { CONFIG } from '../../utils/StoriesService'

const trackGA = (url: string) => {
  if (CONFIG.GA && window !== undefined && window['gtag']) {
    window['gtag']('config', CONFIG.GA, {
      page_location: url
    })
  }
}

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (url) => {
  NProgress.done()
  trackGA(url)
})
Router.events.on('routeChangeError', () => NProgress.done())

const AppHead: FunctionComponent<{ settings: GlobalStoryblok }> = ({ settings }) => {
  const favicon = settings.setup_favicon
  const loadFonts: string[] = getFontBasedOnSetting(settings)

  return (
    <NextHead>
      {favicon && (
        <>
          <link rel="icon" href={imageService(favicon, `32x32`)} sizes="32x32" key={`favicon`} />
          <link rel="apple-touch-icon-precomposed" href={imageService(favicon, `152x152`)}
                key={`apple-touch-icon-precomposed`} />
        </>
      )}
      {StoryblokService.insideVisualComposer() && (
        <script src={`//app.storyblok.com/f/storyblok-latest.js?t=${StoryblokService.getToken()}`}></script>
      )}
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net/" crossOrigin="anonymous" />
      <link href={`https://fonts.googleapis.com/css?family=${loadFonts.join('|')}&display=swap`} rel="stylesheet" />
      {settings.setup_google_site_verification &&
      <meta name="google-site-verification" content={settings.setup_google_site_verification}
            key="google-site-verification" />}
    </NextHead>
  )
}

export default memo(AppHead)
