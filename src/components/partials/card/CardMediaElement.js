import {CardMedia} from '@rmwc/card'
import {getImageAttrs} from '../../../utils/ImageService'
import {getImage} from '../../../utils/fetchImageHelper'
import {useState, useEffect} from 'react'

const CardMediaElement = ({sixteenByNine, square, children, inView, image, variant, width, height}) => {
  const [styles, setStyles] = useState({
    color: variant.includes('font_white') ? 'white' : 'inherit'
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
          onReady (src) {
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
