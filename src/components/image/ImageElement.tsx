import React from 'react'
import { ImageStoryblok } from '../../typings/generated/components-schema'
import Image from './Image'
import ImageSvg from './ImageSvg'
import SbEditable from 'storyblok-react'

export type LmImageProps = { content: ImageStoryblok }

export function LmImage({ content }: LmImageProps): JSX.Element {
  const isSvgImage = content.source && content.source.endsWith('.svg')
  if (isSvgImage) {
    return <SbEditable content={content}><ImageSvg content={content} /></SbEditable>
  }
  return <SbEditable content={content}><Image content={content} /></SbEditable>
}


