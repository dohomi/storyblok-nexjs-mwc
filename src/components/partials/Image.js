import SbEditable from 'storyblok-react'
import {getImageAttrs} from '../../utils/ImageService'
import clsx from 'clsx'
import withWindowDimensions from '../provider/WithWindowDimensions'
import {useInView} from 'react-intersection-observer'


const Image = (props) => {
  const fallback = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
  const content = props.content
  const imageCrop = content.image_crop || []
  const property = content.property || []

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
    let definedWidth = content.width
    let definedHeight = content.height
    const width = Math.ceil(parentElementDimensions.width)
    if ((!definedWidth && !definedHeight) || imageCrop.length || content.fit_in_color) {
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
      const grandParent = parentElement.parentElement
      const grandParentDim = grandParent.getBoundingClientRect()
      // with a tolerance of 200 height should fit grandparents height
      if (grandParentDim.width > parentElementDimensions.width + 200) {
        definedHeight = Math.ceil(grandParentDim.height)
      }
    }
    const imgAttrs = getImageAttrs({
      originalSource: content.source,
      width: definedWidth,
      height: definedHeight,
      fitInColor: content.fitInColor,
      smart: imageCrop.includes('smart_crop')
    })

    imgProps = {
      ...imgProps,
      ...imgAttrs,
      style: {
        width: content.width ? `${content.width}px` : 'auto',
        maxHeight: 'inherit',
        height: content.height ? `${content.height}px` : 'auto'
      }
    }
  }

  function onImageLoaded () {
    intersectionElement && intersectionElement.target.firstElementChild.classList.add('loaded')
  }


  return (
    <SbEditable content={content}>
      <figure ref={refIntersectionObserver} className="img-figure">
        <img {...imgProps} onLoad={onImageLoaded}/>
      </figure>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Image)
