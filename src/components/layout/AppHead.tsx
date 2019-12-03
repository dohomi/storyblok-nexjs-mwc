import imageService from '../../utils/ImageService'
import StoryblokService from '../../utils/StoryblokService'
import NextHead from 'next/head'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'
import { getFontBasedOnSetting } from '../../utils/parseFont'

const iconSizes = [16, 32, 96, 192]

const AppHead: FunctionComponent<{ settings: GlobalStoryblok }> = ({ settings }) => {
  const favicon = settings.setup_favicon
  const loadFonts: string[] = getFontBasedOnSetting(settings)

  return (
    <NextHead>
      {favicon && iconSizes.map(size => (
        <link rel="icon" sizes={`${size}/${size}`} href={imageService(favicon, `${size}x${size}`)}
              key={`fav_${size}`} />
      ))}
      {StoryblokService.insideVisualComposer() && (
        <script src={`//app.storyblok.com/f/storyblok-latest.js?t=${StoryblokService.getToken()}`}></script>
      )}
      <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net/" crossOrigin="anonymous" />
      <link href={`https://fonts.googleapis.com/css?family=${loadFonts.join('|')}&display=swap`} rel="stylesheet" />
    </NextHead>
  )
}

export default memo(AppHead)
