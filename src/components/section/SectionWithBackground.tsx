import clsx from 'clsx'
import { getImageAttrs, getPreviewImageSource } from '../../utils/ImageService'
import { useInView } from 'react-intersection-observer'
import { createRef, CSSProperties, FunctionComponent, RefObject, useEffect, useState } from 'react'
import { getImage } from '../../utils/fetchImageHelper'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import useResizeAware from '../react-resize-aware/src/useResizeAware'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'


type SectionWithBackgroundProps = {
  isColumn?: boolean
  containerProps: any
  style: any
  background_style?: string
  className: string[] | string
  isFullHeight?: boolean
}

const WithBackgroundImage: FunctionComponent<SectionWithBackgroundProps> = (props) => {
  const isColumn = props.isColumn // used in Column.js
  const containerProps = props.containerProps || {}
  const backgroundImage = containerProps.image // original img source
  const backgroundStyle = props.background_style // background attachment props
  const imageProperties = containerProps.imageProperties
  const lazyDisabled = imageProperties.includes('disable_lazy_load')
  let containerRef: HTMLDivElement
  const wrap: RefObject<HTMLDivElement> = createRef()
  const [resizeListener, sizes] = useResizeAware()
  // const sizes = useComponentSize(wrap)
  const dimensions = useWindowDimensions()

  const containerClasses = clsx(
    !isColumn && 'mw-100 mh-100',
    'lm-relative-wrap',
    props.className, {
      // 'lm-background-image': true,
      // 'progressive-img-container': true
    })

  const backgroundClasses = 'progressive-img-container lm-background-image'

  const [refIntersectionObserver, inView, intersectionElement] = useInView(intersectionDefaultOptions)

  const initialSrc = getPreviewImageSource(backgroundImage)
  const initialState = {
    backgroundImage: `url("${initialSrc}")`
  }
  let [styles, setStyles] = useState({})

  useEffect(
    () => {
      const processImg = (container: HTMLDivElement) => {
        let overwriteHeight

        // @ts-ignore
        const isDevice = window['userDevice'] && window['userDevice'].device
        if (!isDevice) {
          if (['fixed_cover', 'fixed_image'].includes(backgroundStyle as string)) {
            overwriteHeight = dimensions.height// overwrite height to match viewport height
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
          onReady(src: string) {
            const newStyles: CSSProperties = {
              ...styles,
              // filter: 'blur(0)', // unset blur effect
              backgroundImage: `url("${src}")`
            }
            if (['fixed_cover', 'fixed_image'].includes(backgroundStyle as string) && !isDevice) {
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
        let container = intersectionElement.target as HTMLDivElement
        processImg(container)
      }
    },
    [backgroundImage, dimensions.width, dimensions.height, inView, sizes]
  )


  function setRef(el: HTMLDivElement) {
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

export default WithBackgroundImage
