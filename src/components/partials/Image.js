import SbEditable from 'storyblok-react'
import {getImageAttrs} from '../../utils/ImageService'
import clsx from 'clsx'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {getImage} from '../../utils/fetchImageHelper'
import {useInView} from 'react-intersection-observer'
import React, {useEffect, useState} from 'react'


/**
 *
 * @param width
 * @param height
 * @param definedWidth
 * @param definedHeight
 * @param originalSource
 * @param smart
 * @param fitInColor
 * @param cropped
 * @param square
 * @return {{src: string}}
 */
function getSource ({width, height, definedWidth = 0, definedHeight = 0, originalSource = '', smart = false, fitInColor, cropped, square}) {
  width = parseInt(width)
  if ((!definedWidth && !definedHeight) || cropped || fitInColor) {
    // default: set available width to the current width either in crop mode
    definedWidth = definedWidth || width
  }
  if (square) {
    // overwrite if square
    const iconSize = definedHeight || definedWidth || '64'
    definedWidth = iconSize
    definedHeight = iconSize
  }
  const imgObj = getImageAttrs({originalSource, width: definedWidth, height: definedHeight, fitInColor, smart})
  return imgObj
}


const Image = (props) => {
  const width = props.dimensions.width
  const height = props.dimensions.height
  const content = props.content
  const imageCrop = content.image_crop || []
  const property = content.property || []

  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  const className = clsx('img-fluid', 'progressive-img-container', content.property)
  const [imageProps, setImageProps] = useState({
    src: '',
    style: {},
    alt: content.alt || 'website image',
    className
  })

  const imageProperties = {
    originalSource: content.source,
    definedWidth: content.width,
    definedHeight: content.height,
    smart: imageCrop.includes('smart_crop'),
    fitInColor: content.fit_in_color,
    cropped: imageCrop.length,
    square: property.includes('rounded-circle') || property.includes('square')
  }

  useEffect(() => {
    if (!intersectionElement) {
      return // don't proceed
    }
    const elementDimensions = intersectionElement.boundingClientRect
    if (inView) {
      // small preview
      // setImageProps({
      //   src: getSmallSource(content, {width: 42, height: 42}),
      //   style: {
      //     width: '100%',
      //     maxHeight: elementDimensions.height + 'px'
      //   }
      // })

      let imgDimensions = {
        ...imageProperties,
        width: elementDimensions.width,
        height: elementDimensions.height
      }
      const imgSource = getSource(imgDimensions)
      setImageProps({
        ...imageProps,
        src: imgSource.src,
        srcSet: imgSource.srcSet,
        style: {
          width: content.width ? `${content.width}px` : 'auto',
          maxHeight: 'inherit',
          height: content.height ? `${content.height}px` : 'auto'
        }
      })

      getImage({
        src: imgSource.src,
        srcSet: imgSource.srcSet,
        onReady: () => {
          intersectionElement.target.firstElementChild.classList.add('loaded')
        }
      })

      // fetchImageSource(imgSource.src)
      //   .then(() => {
      //     // intersectionElement.target.firstElementChild.classList.add('loaded')
      //   })
    }
  }, [width, height, inView, content.source])

  return (
    <SbEditable content={content}>
      <div className="w-100" ref={refIntersectionObserver}>
        <img {...imageProps}/>
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Image)
