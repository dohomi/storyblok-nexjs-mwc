import clsx from 'clsx'
import SbEditable from 'storyblok-react'
import withWindowDimensions from './provider/WithWindowDimensions'
import {useInView} from 'react-intersection-observer'
import useResizeObserver from 'use-resize-observer'
import {useEffect, useState} from 'react'
import ImageListItem from './partials/ImageListItem'
import ImageListLightbox from './partials/ImageListLightbox'

const ImageList = (props) => {
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  const [refResizeObserver, width] = useResizeObserver()
  const [childDimensions, setChildDimensions] = useState({width: 0, height: 0})
  const [lightbox, setLightbox] = useState(false)

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
  content.enable_lightbox && (listItemStyles.cursor = 'pointer')

  function onImageClick (props) {
    // open lightbox
    content.enable_lightbox && setLightbox(props._uid)
  }

  function closeLightbox () {
    // close ligthbox
    setLightbox(false)
  }

  return (
    <SbEditable content={content}>
      <div ref={refResizeObserver}>
        <ul className={imageContainerClasses}
            ref={refIntersectionObserver}
            style={listStyles}>
          {elements.map((item, i) => ImageListItem({
            ...item,
            style: listItemStyles,
            aspectRatio: content.aspect_ratio,
            masonry: content.masonry,
            inView,
            childDimensions,
            crop: content.image_crop,
            fitInColor: content.fit_in_color,
            onImageClick: (ev) => onImageClick({_uid: item._uid, count: i, ...ev})
          }))}
        </ul>
      </div>
      {lightbox && ImageListLightbox({
        elements,
        lightbox,
        setLightbox,
        dimensions,
        onImageClick
      })}
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(ImageList)
