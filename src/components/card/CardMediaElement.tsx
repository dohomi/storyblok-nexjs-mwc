import { CardMedia, CardMediaProps } from '@rmwc/card'
import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import { CSSProperties, FunctionComponent, useEffect, useState } from 'react'
import { CardListStoryblok } from '../../typings/generated/components-schema'

export type CardMediaElementProps = CardMediaProps & Pick<CardListStoryblok, 'image_size' | 'variant'> & {
  inView: boolean
  image?: string
  width: number
  height: number
}

const CardMediaElement: FunctionComponent<CardMediaElementProps> = ({ image_size, sixteenByNine, square, children, inView, image, variant, width, height }) => {
  variant = variant || []
  const [styles, setStyles] = useState<CSSProperties>({
    color: variant.includes('font_white') ? 'white' : 'inherit',
    backgroundSize: image_size || 'cover'
  })
  useEffect(
    () => {
      if (inView && width && height && image) {
        const img = getImageAttrs({
          originalSource: image,
          width,
          height,
          smart: true
        })
        getImage({
          ...img,
          onReady(src: string) {
            setStyles({
              ...styles,
              backgroundImage: `url("${src}")`,
              filter: 'blur(0)',
              backgroundColor: 'transparent'
            })
          }
        })
      }
    },
    [width, height, image, inView]
  )

  return (
    <CardMedia style={styles}
               sixteenByNine={sixteenByNine}
               className="progressive-img-blur-container"
               square={square}>
      {children}
    </CardMedia>
  )
}
export default CardMediaElement
