import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'
import withWindowDimensions, { WithWindowDimensionsProps } from '../provider/WithWindowDimensions'
import { getImageAttrs } from '../../utils/ImageService'
import { ImageStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'


const Image: FunctionComponent<{
  content: ImageStoryblok
}> = ({ content}) => {
  const dimensions = useWindowDimensions()
  const fallback = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
  const imageCrop = content.image_crop || []
  const property = content.property || []
  const fitInColor = (content.color && content.color.rgba) || content.fit_in_color
  const containerClassName = clsx('img-figure', content.class_names && content.class_names.values)

  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  const className = clsx('img-fluid', 'progressive-img-container', content.property)
  let imgProps = {
    src: fallback,
    srcSet: fallback,
    style: {},
    alt: content.alt || 'website image',
    className
  }

  if (inView && content.source) {
    const parentElement = intersectionElement.target.parentElement
    let parentElementDimensions = parentElement.getBoundingClientRect()
    const square = property.includes('rounded-circle') || property.includes('square')
    let definedWidth: string | number = content.width
    let definedHeight: string | number = content.height_xs && dimensions.width <= 600 ? content.height_xs : content.height
    const width = Math.ceil(parentElementDimensions.width)
    if ((!definedWidth && !definedHeight) || imageCrop.length || fitInColor) {
      // default: set available width to the current width either in crop mode
      definedWidth = definedWidth || width
    }
    if (square) {
      // overwrite if square
      const iconSize = definedHeight || definedWidth || '64'
      definedWidth = iconSize
      definedHeight = iconSize
    }
    if (content.height_fill) {
      const grandParentDim = parentElement.parentElement.getBoundingClientRect()
      // with a tolerance of 200 height should fit grandparents height
      if (grandParentDim.width > parentElementDimensions.width + 200) {
        definedHeight = Math.ceil(grandParentDim.height)
      }
    }
    const imgAttrs = getImageAttrs({
      originalSource: content.source,
      width: definedWidth,
      height: definedHeight,
      fitInColor,
      focalPoint: content.focal_point,
      smart: imageCrop.includes('smart_crop')
    })

    imgProps = {
      ...imgProps,
      ...imgAttrs,
      style: {
        width: content.width ? `${content.width}px` : 'auto',
        maxHeight: 'inherit',
        height: definedHeight ? `${definedHeight}px` : 'auto'
      }
    }
  }

  function onImageLoaded() {
    intersectionElement && intersectionElement.target.firstElementChild.classList.add('loaded')
  }


  return (
    <SbEditable content={content}>
      <figure ref={refIntersectionObserver} className={containerClassName}>
        <img {...imgProps} onLoad={onImageLoaded} />
      </figure>
    </SbEditable>
  )
}

export default Image
