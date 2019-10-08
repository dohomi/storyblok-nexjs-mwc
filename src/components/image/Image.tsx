import React, { FunctionComponent } from 'react'
import { ImageStoryblok } from '../../typings/generated/components-schema'
import Image from '../partials/Image'
import ImageSvg from '../partials/ImageSvg'

const ImageElement: FunctionComponent<{ content: ImageStoryblok }> = ({ content }) => {
  const isSvgImage = content.source && content.source.endsWith('.svg')
  if (isSvgImage) {
    return <ImageSvg content={content} />
  }
  return <Image content={content} />
}

export default ImageElement

