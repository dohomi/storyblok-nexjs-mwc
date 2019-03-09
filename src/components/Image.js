import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
import clsx from 'clsx'
import useResizeObserver from 'use-resize-observer'
import {useInView} from 'react-intersection-observer'
import {useEffect} from 'react'

/**
 *
 * @param content
 * @param width
 * @param height
 * @return {*}
 */
function getSource (content, {width, height}) {
  width = parseInt(width)
  height = parseInt(height) - 4 // needs to correct height.
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
  if (imageCrop.includes('smart_crop')) {
  }
  if (content.fit_in_color) {
    path = 'fit-in/' + path
    filter =`:fill(${content.fit_in_color})`
  } else if (imageCrop.includes('smart_crop')) {
    path += '/smart'
  }
  return imageService(content.source, path, filter)
}

const Image = (props) => {
  const [refResizeObserver, width, height] = useResizeObserver()
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  const content = props.content
  const imgClasses = clsx('img-fluid', content.property)


  useEffect(() => {
    /**
     * @type HTMLImageElement
     */
    const element = refResizeObserver.current.firstElementChild
    if (!inView) {
      element.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
    } else {
      element.src = getSource(content, {width, height})
    }
  }, [width, height, inView])

  return (
    <SbEditable content={content}>
      <div className="w-100 h-100" ref={refResizeObserver}>
        <img ref={refIntersectionObserver}
             alt={content.alt || 'website image'}
             className={imgClasses}/>
      </div>
    </SbEditable>
  )
}

export default Image
