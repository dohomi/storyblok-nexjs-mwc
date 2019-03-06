import clsx from 'clsx'
import imageService from '../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import React, {useEffect} from 'react'
import useResizeObserver from 'use-resize-observer'


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
  const [refResizeObserver, width, height] = useResizeObserver()
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  useEffect(() => {
    if (inView) {
      const element = refResizeObserver.current
      element.style.backgroundImage = getBackgroundImageSource({
        width, height, backgroundImage, backgroundImageProperty
      })
    }
  })
  const backgroundImagePosition = props.background_image_position || 'center'
  const sectionClasses = clsx(props.classNames, {
    'lm-background-section': true,
    'lm-bg-section__repeat': backgroundImageProperty.includes('repeat'),
    'lm-bg-section__contain': backgroundImageProperty.includes('contain')
  })


  return (
    <div ref={refIntersectionObserver}>
      <div className={sectionClasses}
           ref={refResizeObserver}
           style={{
             'backgroundPosition': backgroundImagePosition,
             'padding': !props.isFullHeight && props.padding || '2.5rem 0'
           }}>
        {props.children}
      </div>
    </div>
  )
}

export default WithBackgroundImage
