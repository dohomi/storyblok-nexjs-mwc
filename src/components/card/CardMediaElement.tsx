import { CardMedia } from '@rmwc/card'
import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import * as React from 'react'
import { FunctionComponent, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { CardListItemProps } from './cards'

const CardMediaElement: FunctionComponent<CardListItemProps> = ({ children, content, options }) => {
  const [reference, inView, intersecRef] = useInView(intersectionDefaultOptions)

  useEffect(
    () => {
      if (inView && content.image && intersecRef && intersecRef.target) {
        const mediaEl = intersecRef && intersecRef.target as HTMLDivElement
        const currentWidth = mediaEl.clientWidth || 0
        const currentHeight = mediaEl.clientHeight

        const img = getImageAttrs({
          originalSource: content.image,
          width: currentWidth || 0,
          height: currentHeight,
          smart: true
        })
        getImage({
          ...img,
          onReady(src: string) {
            mediaEl.style.backgroundImage = `url("${src}")`
            mediaEl.style.filter = 'blur(0)'
            mediaEl.style.backgroundColor = 'transparent'
          }
        })
      }
    },
    [inView]
  )

  return (
    <CardMedia style={{
      color: options.variant && options.variant.includes('font_white') ? 'white' : 'inherit',
      backgroundSize: options.image_size || 'cover'
    }}
               ref={reference}
               sixteenByNine={options.image_ratio !== '1x1'}
               className="progressive-img-blur-container"
               square={options.image_ratio === '1x1'}>
      {children}
    </CardMedia>
  )
}
export default CardMediaElement
