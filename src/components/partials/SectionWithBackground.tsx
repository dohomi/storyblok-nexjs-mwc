import clsx from 'clsx'
import { getImageAttrs, getPreviewImageSource } from '../../utils/ImageService'
import { useInView } from 'react-intersection-observer'
import { createRef, FunctionComponent, RefObject, useEffect, useState } from 'react'
import { WithWindowDimensionsProps } from '../provider/WithWindowDimensions'
import { getImage } from '../../utils/fetchImageHelper'
import useResizeAware from 'react-resize-aware'

type SectionWithBackgroundProps = {
  isColumn?: boolean
  containerProps: any
  style: any
  background_style?: string
  className: string[] | string
  dimensions?: WithWindowDimensionsProps
}

const WithBackgroundImage: FunctionComponent<SectionWithBackgroundProps> = (props) => {
  const isColumn = props.isColumn // used in Column.js
  const containerProps = props.containerProps || {}
  const backgroundImage = containerProps.image // original img source
  const backgroundStyle = props.background_style // background attachment props
  const imageProperties = containerProps.imageProperties
  const lazyDisabled = imageProperties.includes('disable_lazy_load')
  let containerRef
  const wrap: RefObject<HTMLDivElement> = createRef()
  const [resizeListener, sizes] = useResizeAware()

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

  const initialSrc = getPreviewImageSource(backgroundImage)
  const initialState = {
    backgroundImage: `url("${initialSrc}")`
  }
  let [styles, setStyles] = useState({})

  useEffect(
    () => {
      const processImg = (container) => {
        let overwriteHeight
        // @ts-ignore
        const isDevice = window.userDevice.device
        if (!isDevice) {
          if (['fixed_cover', 'fixed_image'].includes(backgroundStyle)) {
            overwriteHeight = props.dimensions.height// overwrite height to match viewport height
          }
        }
        const current: HTMLDivElement = wrap.current as HTMLDivElement
        const img = getImageAttrs({
          originalSource: backgroundImage,
          width: current.clientWidth,
          height: overwriteHeight || current.clientHeight,
          focalPoint: containerProps.focalPoint,
          smart: true
        })
        // fetch current image and set correct src after loaded
        getImage({
          src: img.src,
          srcSet: img.srcSet,
          onReady(src) {
            const newStyles = {
              backgroundAttachment: undefined,
              ...styles,
              // filter: 'blur(0)', // unset blur effect
              backgroundImage: `url("${src}")`
            }
            if (['fixed_cover', 'fixed_image'].includes(backgroundStyle) && !isDevice) {
              newStyles.backgroundAttachment = 'fixed'
            }
            setStyles(newStyles)
            container.classList.add('loaded')
          }
        })
      }


      if (lazyDisabled) {
        // only runs if lazy load is disabled
        let container = containerRef
        processImg(container)
      } else if (inView && intersectionElement) {
        // only runs if
        let container = intersectionElement.target
        processImg(container)
      }
    },
    [backgroundImage, props.dimensions.width, props.dimensions.height, inView, sizes]
  )


  function setRef(el) {
    refIntersectionObserver(el)
    containerRef = el
  }

  return (
    <div className={containerClasses}
         ref={wrap}
         style={props.style}>
      {resizeListener}
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

// export default withWindowDimensions(dimensions => ({ dimensions }))(WithBackgroundImage)
export default WithBackgroundImage
