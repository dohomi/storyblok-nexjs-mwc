import imageService from '../../utils/ImageService'
import NextHead from 'next/head'
import React, { memo } from 'react'
import { getFontBasedOnSetting } from '../../utils/parseFont'
import { CONFIG } from '../../utils/config'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import StoryblokService from '../../utils/StoryblokService'

type AppHeadProps = {
  settings: GlobalStoryblok
}

function AppHead({ settings }: AppHeadProps): JSX.Element {
  const favicon = settings.setup_favicon
  const loadFonts: string[] = getFontBasedOnSetting(settings)

  if (process.env.NODE_ENV === 'development') {
    console.log('render app head')
  }
  return (
    <NextHead>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        key="viewport"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net/" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://img2.storyblok.com/" crossOrigin="anonymous" />
      {CONFIG.GA && (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com/" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.google-analytics.com/" crossOrigin="anonymous" />
        </>
      )}
      {favicon && (
        <>
          <link rel="icon" href={imageService(favicon, `32x32`)} sizes="32x32" key={`favicon`} />
          <link rel="apple-touch-icon-precomposed" href={imageService(favicon, `152x152`)}
                key={`apple-touch-icon-precomposed`} />
        </>
      )}
      <link href={`https://fonts.googleapis.com/css?family=${loadFonts.join('|')}&display=swap`} rel="stylesheet" />
      {settings.setup_google_site_verification &&
      <meta name="google-site-verification" content={settings.setup_google_site_verification}
            key="google-site-verification" />}
      {StoryblokService.insideVisualComposer() && (
        <script src="//app.storyblok.com/f/storyblok-latest.js"></script>
      )}
    </NextHead>
  )
}

export default memo(AppHead)
