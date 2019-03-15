import clsx from 'clsx'
import imageService from '../../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import React, {useEffect, useState} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import ProgressiveImage from './ProgressiveImage'

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
  const backgroundStyle = props.background_style
  const backgroundImagePosition = props.background_image_position || 'center'

  const refContainer = React.createRef()

  const width = props.dimensions.width
  const height = props.dimensions.height

  const sectionClasses = clsx(props.classNames, {
    'lm-background-section': true,
    'lm-bg-section__repeat': backgroundImageProperty.includes('repeat'),
    'lm-bg-section__contain': backgroundImageProperty.includes('contain')
  })


  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 500px 0px'
  })
  let [imgDimensions, setImgDimensions] = useState({width: 0, height: 0})
  let [imgSource, setImgSource] = useState('')
  let [imgStyle, setImgStyle] = useState({
    backgroundPosition: backgroundImagePosition,
    padding: !props.isFullHeight && props.padding || '2.5rem 0'
  })


  useEffect(() => {
    if (!window.userDevice.device && ['fixed_image', 'fixed_cover'].includes(backgroundStyle)) {
      setImgStyle({
        ...imgStyle,
        backgroundAttachment: 'fixed', // use fixed
        backgroundSize: 'contain' // overwrite that its bg is not covered
      })
    }
  }, [])

  useEffect(() => {
    const element = refContainer.current
    let elementWidth = element.clientWidth
    let elementHeight = element.clientHeight
    if (inView) {
      // cover img
      if (!window.userDevice.device) {
        if (backgroundStyle === 'fixed_cover') {
          elementHeight = height// overwrite height to match viewport height
        }
      }
      setImgDimensions({width: elementWidth, height: elementHeight})
    }

  }, [width, height, inView])



  /**
   *
   * @param opts
   */
  function onProgressiveChange (opts) {
    if (imgSource !== opts.src) {
      setImgSource(opts.src)
      const newStyles = {
        ...imgStyle,
        ...opts.style,
        backgroundImage: `url("${opts.src}")`
      }
      setImgStyle(newStyles)
    }
  }

  return (
    <div ref={refIntersectionObserver}
         className="mw-100 mh-100">
      <ProgressiveImage onChange={onProgressiveChange}
                        src={backgroundImage}
                        width={imgDimensions.width}
                        height={imgDimensions.height}
                        inView={inView}/>
      <div className={sectionClasses}
           ref={refContainer}
           style={imgStyle}>
        {props.children}
      </div>
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
