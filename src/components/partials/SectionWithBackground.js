import clsx from 'clsx'
import imageService from '../../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import React, {useEffect} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'

const getBackgroundImageSource = ({backgroundImage, backgroundImageProperty = [], width, height}) => {

  let path = ''
  if (!backgroundImageProperty.includes('contain')) {
    path = `${parseInt(width)}x${parseInt(height)}`
    if (backgroundImageProperty.includes('crop')) {
      path += '/smart'
    }
  }
  const src = imageService(backgroundImage, path)
  return `url('${src}')`
}

const WithBackgroundImage = (props) => {
  const backgroundImage = props.background_image
  const backgroundImageProperty = props.background_image_property || []
  let backgroundStyle = props.background_style
  const refContainer = React.createRef()
  // const [refResizeObserver, width, height] = useResizeObserver()
  const width = props.dimensions.width
  const height = props.dimensions.height
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  // backgroundStyle = ''

  useEffect(() => {
    if (inView) {
      const element = refContainer.current
      let elementWidth = element.clientWidth
      let elementHeight = element.clientHeight
      // cover img
      if (!window.userDevice.device) {
        if (backgroundStyle === 'fixed_cover') {
          elementHeight = height// overwrite height to match viewport height
        }
        if (['fixed_image', 'fixed_cover'].includes(backgroundStyle)) {
          element.style.backgroundAttachment = 'fixed' // use fixed
          element.style.backgroundSize = 'contain' // overwrite that its bg is not covered
        }
      }

      // set bg image src
      element.style.backgroundImage = getBackgroundImageSource({
        width: elementWidth, height: elementHeight, backgroundImage, backgroundImageProperty
      })
    }
  }, [width, height, inView])
  const backgroundImagePosition = props.background_image_position || 'center'
  const sectionClasses = clsx(props.classNames, {
    'lm-background-section': true,
    'lm-bg-section__repeat': backgroundImageProperty.includes('repeat'),
    'lm-bg-section__contain': backgroundImageProperty.includes('contain')
  })


  return (
    <div ref={refIntersectionObserver}
         className="mw-100 mh-100">
      <div className={sectionClasses}
           ref={refContainer}
           style={{
             backgroundPosition: backgroundImagePosition,
             padding: !props.isFullHeight && props.padding || '2.5rem 0'
           }}>
        {props.children}
      </div>
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
