import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
import clsx from 'clsx'
import useResizeObserver from 'use-resize-observer'
import {useInView} from 'react-intersection-observer'
import {useEffect} from 'react'

/**
 *
 * @param componentProps
 * @param {width,height}
 * @return {*}
 */
const getSource = (componentProps, {width}) => {
  const property = componentProps.content.property || []
  const availableWidth = componentProps.content.width || width
  const availableHeight = componentProps.content.height || 0
  let path = `${availableWidth || 0}x${availableHeight || 0}`
  if (property.includes('rounded-circle') || property.includes('square')) {
    // overwrite if square
    const iconSize = availableHeight || availableWidth || '64'
    path = `${iconSize}x${iconSize}`
  }
  return imageService(componentProps.content.source, path)
}

const Image = (props) => {
  const [refResizeObserver, width] = useResizeObserver()
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  const componentProps = props
  const imgClasses = clsx(componentProps.content.property)


  useEffect(() => {
    /**
     * @type HTMLImageElement
     */
    const element = refResizeObserver.current.firstElementChild
    if (!inView) {
      element.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
    } else {
      element.src = getSource(componentProps, {width})
    }
  }, [width, inView])

  return (
    <SbEditable content={componentProps.content}>
      <div className={`w-100`} ref={refResizeObserver}>
        <img ref={refIntersectionObserver}
             alt={componentProps.content.alt || 'website image'}
             className={imgClasses}/>
      </div>
    </SbEditable>
  )
}

export default Image
