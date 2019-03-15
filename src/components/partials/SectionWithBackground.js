import clsx from 'clsx'
import imageService from '../../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import React, {useEffect, useState} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {fetchImageSource} from '../../utils/fetchImageHelper'

const getBackgroundImageSource = ({backgroundImage, backgroundImageProperty = [], width, height}) => {

  let path = ''
  if (!backgroundImageProperty.includes('contain')) {
    path = `${parseInt(width)}x${parseInt(height)}`
    if (backgroundImageProperty.includes('crop')) {
      path += '/smart'
    }
  }
  return imageService(backgroundImage, path)
}

const WithBackgroundImage = (props) => {
  const backgroundImage = props.background_image
  const backgroundImageProperty = props.background_image_property || []
  const backgroundStyle = props.background_style
  const backgroundImagePosition = props.background_image_position || 'center'

  const refContainer = React.createRef()

  const sectionClasses = clsx(props.classNames, {
    'lm-background-section': true,
    'progressive-img-container': true,
    'lm-bg-section__repeat': backgroundImageProperty.includes('repeat'),
    'lm-bg-section__contain': backgroundImageProperty.includes('contain')
  })


  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 500px 0px'
  })

  const initialSrc = getBackgroundImageSource({
    backgroundImage, width: 42, height: 42
  })

  let [imgStyle, setImgStyle] = useState({
    backgroundPosition: backgroundImagePosition,
    padding: !props.isFullHeight && props.padding || '2.5rem 0'
  })


  useEffect(() => {
    let newStyles = {
      ...imgStyle,
      backgroundImage: `url('${initialSrc}')`
    }
    if (!window.userDevice.device && ['fixed_image', 'fixed_cover'].includes(backgroundStyle)) {
      newStyles = {
        ...newStyles,
        backgroundPosition: 'inherit',
        backgroundAttachment: 'fixed', // use fixed
        backgroundSize: 'contain' // overwrite that its bg is not covered
      }
    }
    setImgStyle(newStyles)
  }, [])

  useEffect(() => {
    const element = refContainer.current
    let elementWidth = element.clientWidth
    let elementHeight = element.clientHeight
    if (inView) {
      // cover img
      if (!window.userDevice.device) {
        if (backgroundStyle === 'fixed_cover') {
          elementHeight = props.dimensions.height// overwrite height to match viewport height
        }
      }
      const newImgSource = getBackgroundImageSource({
        width: elementWidth, height: elementHeight, backgroundImage, backgroundImageProperty
      })
      fetchImageSource(newImgSource)
        .then(() => {
          setImgStyle({
            ...imgStyle,
            filter: 'blur(0)', // unset blur effect
            backgroundImage: `url("${newImgSource}")`
          })
        })
    }
  }, [props.dimensions.width, props.dimensions.height, inView])

  return (
    <div ref={refIntersectionObserver}
         className="mw-100 mh-100">
      <div className={sectionClasses}
           ref={refContainer}
           style={imgStyle}>
        {props.children}
      </div>
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
