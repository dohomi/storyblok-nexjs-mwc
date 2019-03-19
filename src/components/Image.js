import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
import clsx from 'clsx'
import {useInView} from 'react-intersection-observer'
import React, {useEffect, useState} from 'react'
import withWindowDimensions from './provider/WithWindowDimensions'
import {fetchImageSource} from '../utils/fetchImageHelper'

/**
 *
 * @param content
 * @param width
 * @param height
 * @return {*}
 */
function getSource (content, {width, height}) {
  width = parseInt(width)
  height = parseInt(height)
  const imageCrop = content.image_crop || []
  const property = content.property || []
  let availableWidth = content.width || 0
  let availableHeight = content.height || 0
  if (content.height_fill && availableHeight) {
    // in case user wants that image covers height of column
    availableHeight = availableHeight > height ? availableHeight : height
    availableWidth = width
  }
  if ((!availableWidth && !availableHeight) || imageCrop.length || content.fit_in_color) {
    // default: set available width to the current width either in crop mode
    availableWidth = availableWidth || width
  }
  if (property.includes('rounded-circle') || property.includes('square')) {
    // overwrite if square
    const iconSize = availableHeight || availableWidth || '64'
    availableWidth = iconSize
    availableHeight = iconSize
  }
  let filter = ''
  let path = `${availableWidth}x${availableHeight}`

  if (content.fit_in_color) {
    path = 'fit-in/' + path
    filter = `:fill(${content.fit_in_color})`
  } else if (imageCrop.includes('smart_crop')) {
    path += '/smart'
  }
  return imageService(content.source, path, filter)
}

function getSmallSource (content) {
  return imageService(content.source, '42x42')
}

const Image = (props) => {
  const width = props.dimensions.width
  const height = props.dimensions.height


  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  const [imageProps, setImageProps] = useState({
    src: '',
    style: {}
  })

  const content = props.content
  const className = clsx('img-fluid', 'progressive-img-container', content.property)
  const containerClasses = clsx('w-100', {'h-100': !!content.height_fill})

  useEffect(() => {
    if (!intersectionElement) {
      return // don't proceed
    }
    const elementDimensions = intersectionElement.boundingClientRect
    if (content.height_fill) {
      intersectionElement.target.style.maxHeight = elementDimensions.height
    }

    if (inView) {
      // small preview
      setImageProps({
        src: getSmallSource(content, {width: 42, height: 42}),
        style: {
          width: '100%',
          maxHeight: elementDimensions.height + 'px'
        }
      })

      let imgDimensions = {width: elementDimensions.width, height: elementDimensions.height}
      const imgSource = getSource(content, imgDimensions)
      fetchImageSource(imgSource)
        .then(() => {
          setImageProps({
            src: imgSource,
            style: {
              width: content.width ? `${content.width}px` : 'auto',
              maxHeight: 'inherit',
              height: !content.height_fill && content.height ? content.height : 'auto',
              filter: 'blur(0)'
            }
          })
        })
    }
  }, [width, height, inView])

  const currentProps = {
    ...imageProps,
    alt: content.alt || 'website image'
  }

  return (
    <SbEditable content={content}>
      <div className={containerClasses} ref={refIntersectionObserver}>
        <img {...currentProps}/>
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Image)
