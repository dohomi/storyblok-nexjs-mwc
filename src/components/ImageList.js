import clsx from 'clsx'
import SbEditable from 'storyblok-react'
import withWindowDimensions from './provider/WithWindowDimensions'
import {useInView} from 'react-intersection-observer'
import {useEffect, useState} from 'react'
import ImageListItem from './partials/ImageListItem'
import ImageListLightbox from './partials/ImageListLightbox'
import React from 'react'


const ImageList = (props) => {
  const containerRef = React.createRef()
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })
  const [childDimensions, setChildDimensions] = useState({width: 0, height: 0})
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    let firstChild = element.firstChild
    if (!firstChild) return
    if (!firstChild.firstElementChild) return
    let imageContainer = firstChild.firstElementChild.firstElementChild.tagName === 'IMG' ?
      firstChild.firstElementChild : firstChild.firstElementChild.firstElementChild

    setChildDimensions({
      width: imageContainer.clientWidth,
      height: imageContainer.clientHeight
    })
  }, [props.dimensions.width])

  const content = props.content
  const elements = content.body
  let gutterSize = content.column_gap || 2
  let columnCount = content.column_count || 5
  let columnCountTablet = content.column_count_tablet || 4
  let columnCountPhone = content.column_count_phone || 1


  const imageContainerClasses = clsx(
    'mdc-image-list',
    {
      'mdc-image-list--masonry': !!content.masonry,
      'mdc-image-list--with-text-protection': !!content.text_protection,
      [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCount}-desktop-${gutterSize}`]: true,
      [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCountTablet}-tablet-${gutterSize}`]: true,
      [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCountPhone}-phone-${gutterSize}`]: true
    }
  )
  const listItemStyles = {}
  content.enable_lightbox && (listItemStyles.cursor = 'pointer')

  function onImageClick (props) {
    // open lightbox
    content.enable_lightbox && setLightbox(props._uid)
  }

  return (
    <SbEditable content={content}>
      <div ref={containerRef}>
        <ul className={imageContainerClasses}
            ref={refIntersectionObserver}>
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
        dimensions: props.dimensions,
        onImageClick
      })}
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(ImageList)
