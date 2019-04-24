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
  const fitInColor = (content.color && content.color.rgba) || content.fit_in_color
  // const figureStyle = {}
  // console.log(props.dimensions.width, content.height_xs)
  // if (content.height_xs && props.dimensions.width <= 600) {
  //   figureStyle.maxHeight = `${content.height_xs}px`
  // }
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
    let definedHeight = content.height_xs && props.dimensions.width <= 600 ? content.height_xs : content.height
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
