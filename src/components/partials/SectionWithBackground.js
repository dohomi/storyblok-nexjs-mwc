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
  const isColumn = props.isColumn
  const containerProps = props.containerProps || {}
  const backgroundImage = containerProps.image // original img source
  const backgroundImageProperty = containerProps.imageProperties || [] // repeat,contain..
  const backgroundStyle = props.background_style // background attachment props

  const containerClasses = clsx(
    !isColumn && 'mw-100 mh-100',
    props.className, {
      'lm-background-image': true,
      'progressive-img-container': true,
      'lm-bg-section__repeat': backgroundImageProperty.includes('repeat'),
      'lm-bg-section__contain': backgroundImageProperty.includes('contain')
    })


  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  const initialSrc = getBackgroundImageSource({
    backgroundImage, width: 42, height: 42
  })

  let [styles, setStyles] = useState({
    ...props.style
  })


  useEffect(() => {
    let newStyles = {
      ...styles
    }
    if (!window.userDevice.device && ['fixed_image', 'fixed_cover'].includes(backgroundStyle)) {
      newStyles = {
        ...newStyles,
        backgroundPosition: 'inherit',
        backgroundAttachment: 'fixed', // use fixed
        backgroundSize: 'contain' // overwrite that its bg is not covered
      }
    }
    setStyles(newStyles)
  }, [backgroundStyle])

  useEffect(() => {
    if (!intersectionElement) return
    const elementDimensions = intersectionElement.boundingClientRect
    let elementWidth = elementDimensions.width
    let elementHeight = elementDimensions.height
    if (inView) {
      setStyles({
        ...styles,
        backgroundImage: `url('${initialSrc}')`
      })
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
          setStyles({
            ...styles,
            filter: 'blur(0)', // unset blur effect
            backgroundImage: `url("${newImgSource}")`
          })
        })
    }
  }, [backgroundImage, props.dimensions.width, props.dimensions.height, inView])

  return (
    <div ref={refIntersectionObserver}
         className={containerClasses}
         style={styles}>
      {props.children}
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
