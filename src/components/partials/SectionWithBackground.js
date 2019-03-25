import clsx from 'clsx'
import imageService from '../../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import React, {useEffect, useState} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {fetchImageSource} from '../../utils/fetchImageHelper'

const getBackgroundImageSource = ({backgroundImage, width, height}) => {
  let path = ''
  if (width && height) {
    path = `${parseInt(width)}x${parseInt(height)}/smart`
  }
  return imageService(backgroundImage, path)
}

const WithBackgroundImage = (props) => {
  const isColumn = props.isColumn // used in Column.js
  const containerProps = props.containerProps || {}
  const backgroundImage = containerProps.image // original img source
  const backgroundStyle = props.background_style // background attachment props
  const imageProperties = containerProps.imageProperties
  const lazyDisabled = imageProperties.includes('disable_lazy_load')
  const containerClasses = clsx(
    !isColumn && 'mw-100 mh-100',
    props.className, {
      'lm-background-image': true,
      'progressive-img-container': true
    })


  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  const initialSrc = getBackgroundImageSource({
    backgroundImage, width: 42, height: 42
  })

  let [styles, setStyles] = useState({
    ...props.style,
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url("${initialSrc}")`
  })

  useEffect(
    () => {
      // only if lazyload disabled
      setStyles({
        ...styles,
        filter: 'blur(0)' // unset blur effect
      })
      const newImgSource = getBackgroundImageSource({
        width: props.dimensions.width, height: 0, backgroundImage
      })
      fetchAndSetImg(newImgSource)
    },
    [props.dimensions.width, props.dimensions.height, backgroundImage]
  )

  useEffect(() => {
    // only runs if lazy load is enabled (default)
    if (lazyDisabled || !intersectionElement) return
    const elementDimensions = intersectionElement.boundingClientRect
    let elementWidth = elementDimensions.width
    let elementHeight = elementDimensions.height
    if (inView) {
      // cover img
      if (!window.userDevice.device) {
        if (backgroundStyle === 'fixed_cover') {
          elementHeight = props.dimensions.height// overwrite height to match viewport height
        }
      }
      const newImgSource = getBackgroundImageSource({
        width: elementWidth, height: elementHeight, backgroundImage
      })
      fetchAndSetImg(newImgSource)
    }
  }, [backgroundImage, props.dimensions.width, props.dimensions.height, inView])

  function fetchAndSetImg (src) {
    fetchImageSource(src)
      .then(() => {
        setStyles({
          ...styles,
          filter: 'blur(0)', // unset blur effect
          backgroundImage: `url("${src}")`
        })
      })
  }

  return (
    <div ref={refIntersectionObserver}
         className={containerClasses}
         style={styles}>
      {props.children}
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
