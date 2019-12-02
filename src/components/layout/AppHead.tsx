import imageService from '../../utils/ImageService'
import StoryblokService from '../../utils/StoryblokService'
import NextHead from 'next/head'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { GlobalStoryblok } from '../../typings/generated/components-schema'

const iconSizes = [16, 32, 96, 192]

const AppHead: FunctionComponent<{ settings: GlobalStoryblok }> = ({ settings }) => {
  const favicon = settings.setup_favicon

  const settingsFonts = ['theme_font_default', 'theme_font_alt1', 'theme_font_alt2', 'theme_font_alt3', 'theme_font_alt4']
  const loadFonts: string[] = []
  Object.keys(settings).forEach(key => {
    if (settingsFonts.includes(key) && settings[key]) {
      loadFonts.push(settings[key])
    }
  })

  return (
    <NextHead>
      {favicon && iconSizes.map(size => (
        <link rel="icon" sizes={`${size}/${size}`} href={imageService(favicon, `${size}x${size}`)}
              key={`fav_${size}`} />
      ))}
      {StoryblokService.insideVisualComposer() && (
        <script src={`//app.storyblok.com/f/storyblok-latest.js?t=${StoryblokService.getToken()}`}></script>
      )}
      <link href={`https://fonts.googleapis.com/css?family=${loadFonts.join('|')}&display=swap`} rel="stylesheet" />
    </NextHead>
  )
}

export default memo(AppHead)
