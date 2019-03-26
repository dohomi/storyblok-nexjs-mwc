import clsx from 'clsx'
import imageService, {getFocalPoint} from '../../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import {useEffect, useState} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {fetchImageSource} from '../../utils/fetchImageHelper'

const getBackgroundImageSource = ({backgroundImage, width, height, focalPoint}) => {
  let path = ''
  let focal = ''
  if (width && height) {
    path = `${parseInt(width)}x${parseInt(height)}`
  }
  if (!focalPoint) {
    path += '/smart'
  } else {
    focal = getFocalPoint(backgroundImage, focalPoint)
  }
  return imageService(backgroundImage, path, focal)
}

const WithBackgroundImage = (props) => {
  const isColumn = props.isColumn // used in Column.js
  const containerProps = props.containerProps || {}
  const backgroundImage = containerProps.image // original img source
  const backgroundStyle = props.background_style // background attachment props
  const imageProperties = containerProps.imageProperties
  const lazyDisabled = imageProperties.includes('disable_lazy_load')

  let containerRef

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
      setStyles({
        ...styles,
        filter: 'blur(10px)' // set blur effect
      })
      if (lazyDisabled) {
        // only runs if lazy load is disabled
        fetchAndSetImg(getBackgroundImageSource({
          width: containerRef.clientWidth,
          height: containerRef.clientHeight,
          backgroundImage,
          focalPoint: containerProps.focalPoint
        }))
      } else if (inView && intersectionElement) {
        // only runs if
        setLazyImg()
      }
    },
    [backgroundImage, props.dimensions.width, props.dimensions.height, inView]
  )

  function setLazyImg () {
    const elementDimensions = intersectionElement.boundingClientRect
    let elementWidth = elementDimensions.width
    let elementHeight = elementDimensions.height
    // cover img
    if (!window.userDevice.device) {
      if (backgroundStyle === 'fixed_cover') {
        elementHeight = props.dimensions.height// overwrite height to match viewport height
      }
    }
    const newImgSource = getBackgroundImageSource({
      width: elementWidth,
      height: elementHeight,
      backgroundImage,
      focalPoint: containerProps.focalPoint
    })
    fetchAndSetImg(newImgSource)
  }

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

  function setRef (el) {
    refIntersectionObserver(el)
    containerRef = el
  }

  return (
    <div ref={setRef}
         className={containerClasses}
         style={styles}>
      {props.children}
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
