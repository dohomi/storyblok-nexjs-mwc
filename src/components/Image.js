import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
import clsx from 'clsx'
import {useInView} from 'react-intersection-observer'
import React, {useEffect} from 'react'
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
  const refResizeObserver = React.createRef()
  const width = props.dimensions.width
  const height = props.dimensions.height


  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 500px 0px'
  })
  const content = props.content
  const imgClasses = clsx('img-fluid', content.property)
  const containerClasses = clsx('w-100', 'progressive-img-container', {'h-100': !!content.height_fill})

  useEffect(() => {
    const imgContainer = refResizeObserver.current
    const img = imgContainer.firstElementChild

    if (!inView) {
      if (content.height_fill) {
        imgContainer.style.maxHeight = imgContainer.clientHeight
      }
      img.src = getSmallSource(content, {width: 42, height: 42})
      img.style.width = '100%'
      img.style.maxHeight = imgContainer.clientHeight + 'px'
      // img.style.objectFit = 'scale-down'
    } else {
      let imgDimensions = {width: imgContainer.clientWidth, height: imgContainer.clientHeight}
      const imgSource = getSource(content, imgDimensions)
      fetchImageSource(imgSource)
        .then(() => {
          img.style.width = 'inherit'
          img.style.maxHeight = 'inherit'
          img.src = imgSource
          imgContainer.style.filter = 'blur(0)'
        })
    }
  }, [width, height, inView])

  return (
    <SbEditable content={content}>
      <div className={containerClasses} ref={refResizeObserver}>
        <img ref={refIntersectionObserver}
             alt={content.alt || 'website image'}
             className={imgClasses}/>
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Image)
