import clsx from 'clsx'
import {getImageSource, getOriginaImageDimensions} from '../../utils/ImageService'
import {useInView} from 'react-intersection-observer'
import {useEffect, useState} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {fetchImageSource} from '../../utils/fetchImageHelper'


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
    'lm-relative-wrap',
    props.className, {
      // 'lm-background-image': true,
      // 'progressive-img-container': true
    })

  const backgroundClasses = 'progressive-img-container lm-background-image'

  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })


  const orig = getOriginaImageDimensions(backgroundImage)
  const initialSrc = getImageSource({
    image: backgroundImage,
    width: orig.width / 100,
    height: orig.height / 100
  })
  const initialState = {
    backgroundImage: `url("${initialSrc}")`
  }
  let [styles, setStyles] = useState({})

  useEffect(
    () => {
      setStyles({
        ...styles,
        // filter: 'blur(10px)' // set blur effect
      })
      if (lazyDisabled) {
        // only runs if lazy load is disabled
        fetchAndSetImg(getImageSource({
          width: containerRef.clientWidth,
          height: containerRef.clientHeight,
          image: backgroundImage,
          focalPoint: containerProps.focalPoint
        }), containerRef)
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
    const newImgSource = getImageSource({
      width: elementWidth,
      height: elementHeight,
      image: backgroundImage,
      focalPoint: containerProps.focalPoint
    })
    fetchAndSetImg(newImgSource, intersectionElement.target)
  }

  function fetchAndSetImg (src, reference) {
    setStyles({
      ...styles,
      // filter: 'blur(0)', // unset blur effect
      backgroundImage: `url("${src}")`
    })
    fetchImageSource(src)
      .then(() => {
        reference.classList.add('loaded')
      })
  }

  function setRef (el) {
    refIntersectionObserver(el)
    containerRef = el
  }

  return (
    <div className={containerClasses}
         style={props.style}>
      <div className="lm-background__absolute-fill lm-background-image lm-background__blurred"
           style={initialState}>
      </div>
      <div className={backgroundClasses}
           ref={setRef}
           style={styles}>
      </div>
      {props.children}
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(WithBackgroundImage)
