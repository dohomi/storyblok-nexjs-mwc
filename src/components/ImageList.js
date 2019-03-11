import clsx from 'clsx'
import SbEditable from 'storyblok-react'
import withWindowDimensions from './provider/WithWindowDimensions'
import {useInView} from 'react-intersection-observer'
import imageService from '../utils/ImageService'
import useResizeObserver from 'use-resize-observer'
import {useEffect, useState} from 'react'

function onImageLoad (ev) {
  console.log(ev)
}

function getSource (source, {width, height, crop, fitInColor}) {
  let filter = ''
  let path = `${width}x${height}`
  if (crop === 'fit_in') {
    path = 'fit-in/' + path
    filter = `:fill(${fitInColor || 'transparent'})`
  }
  if (crop === 'smart') {
    path += '/smart'
  }
  return imageService(source, path, filter)
}

const Image = (props) => {
  const childDimensions = props.childDimensions
  let aspectRatioStyles
  let height = props.masonry || !props.aspectRatio ? 0 : childDimensions.height
  const width = childDimensions.width
  let crop = props.crop

  crop && (height = childDimensions.height)
  if (props.aspectRatio && !props.masonry) {
    const splitAspectRatio = props.aspectRatio.split('x')
    aspectRatioStyles = {paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%`}
  }
  let src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  if (props.inView) {
    src = getSource(props.source, {width, height, crop: crop,fitInColor:props.fitInColor})
  }

  if (aspectRatioStyles) {
    return (
      <div className="mdc-image-list__image-aspect-container" style={aspectRatioStyles}>
        <img src={src} className="mdc-image-list__image"/>
      </div>
    )
  }
  return (
    <img src={src} className="mdc-image-list__image"/>
  )
}

const ImageListItem = (props) => {
  return (
    <li className="mdc-image-list__item"
        key={props._uid}
        style={props.style}>
      {Image(props)}
      <div className="mdc-image-list__supporting">
        <span className="mdc-image-list__label">{props.label}</span>
      </div>
    </li>
  )
}

const ImageList = (props) => {
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  const [refResizeObserver, width] = useResizeObserver()

  const [childDimensions, setChildDimensions] = useState({width: 0, height: 0})

  useEffect(() => {
    const element = refResizeObserver.current

    let imageContainer = element.firstChild.firstElementChild.firstElementChild.tagName === 'IMG' ?
      element.firstChild.firstElementChild : element.firstChild.firstElementChild.firstElementChild

    setChildDimensions({
      width: imageContainer.clientWidth,
      height: imageContainer.clientHeight
    })
  }, [width])

  const content = props.content
  const elements = content.body
  const imageContainerClasses = clsx(
    'mdc-image-list',
    {
      'mdc-image-list--masonry': !!content.masonry,
      'mdc-image-list--with-text-protection': !!content.text_protection
    }
  )
  let gutterSize = content.column_gap ? parseInt(content.column_gap) : 2
  let columnCount = content.column_count ? parseInt(content.column_count) : 5
  const dimensions = props.dimensions
  if (dimensions.isPhone && content.column_count_phone) {
    columnCount = parseInt(content.column_count_phone)
  }
  if (dimensions.isTablet && content.column_count_tablet) {
    columnCount = parseInt(content.column_count_tablet)
  }

  let listStyles = {}
  // default columns
  let listItemStyles = {
    width: `calc(100% / ${columnCount} - ${Math.round((gutterSize + 1 / columnCount) / 100 * 100)}px)`,
    margin: `${gutterSize / 2}px`
  }
  if (content.masonry) {
    // overwrite styles for masonry
    gutterSize = content.column_gap ? parseInt(content.column_gap) : 16
    listStyles = {
      columnCount: columnCount,
      columnGap: `${gutterSize}px`
    }
    listItemStyles = {
      marginBottom: `${gutterSize}px`
    }
  }

  return (
    <SbEditable content={content}>
      <div ref={refResizeObserver}>
        <ul className={imageContainerClasses}
            ref={refIntersectionObserver}
            style={listStyles}>
          {elements.map(item => ImageListItem({
            ...item,
            style: listItemStyles,
            aspectRatio: content.aspect_ratio,
            masonry: content.masonry,
            inView,
            childDimensions,
            crop: content.image_crop,
            fitInColor: content.fit_in_color
          }))}
        </ul>
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(ImageList)
