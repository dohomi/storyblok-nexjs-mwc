import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { CardListItemProps } from './cards'
import CardMedia from '@material-ui/core/CardMedia'

const CardMediaElement: FunctionComponent<CardListItemProps> = ({ children, content, options }) => {
  const [reference, inView, intersecRef] = useInView(intersectionDefaultOptions)
  const [imgSource, setImgSource] = useState<string>('')
  const contentImage = content.image
  console.log(inView)
  useEffect(
    () => {

      if (inView && contentImage && intersecRef && intersecRef.target) {
        const mediaEl = intersecRef && intersecRef.target as HTMLDivElement
        const currentWidth = mediaEl.clientWidth || 0
        const currentHeight = mediaEl.clientHeight

        console.log(currentWidth, currentHeight)
        const img = getImageAttrs({
          originalSource: contentImage,
          width: currentWidth || 0,
          height: currentHeight,
          smart: true
        })
        getImage({
          ...img,
          onReady(src: string) {
            console.log(src)
            setImgSource(src)
            // mediaEl.style.backgroundImage = `url("${src}")`
            // mediaEl.style.filter = 'blur(0)'
            // mediaEl.style.backgroundColor = 'transparent'
          }
        })
      }
    },
    [inView, intersecRef, contentImage]
  )
//todo
  // sixteenByNine={options.image_ratio !== '1x1'}
  // square={options.image_ratio === '1x1'}

  return (
    <CardMedia style={{
      color: options.variant && options.variant.includes('font_white') ? 'white' : 'inherit',
      backgroundSize: options.image_size || 'cover'
    }}
               image={imgSource}
               ref={reference}
               className="progressive-img-blur-container"
    >
      <div>
        {children}
      </div>
    </CardMedia>
  )
}
export default CardMediaElement
