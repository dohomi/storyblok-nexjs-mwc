import clsx from 'clsx'
import SbEditable from 'storyblok-react'
import { useInView } from 'react-intersection-observer'
import React, { CSSProperties, FunctionComponent, RefObject, useEffect, useState } from 'react'
import ImageListItem from './ImageListItem'
import ImageListLightbox from './ImageListLightbox'
import { ImageListStoryblok } from '../../typings/generated/components-schema'
import { ImageListItemProps } from './ImageListItemImg'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  lightbox: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgba(0,0,0,0.9)'
    },
    '& .MuiDialogTitle-root': {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 2
    },
    '& .carousel': {
      height: '100%'
    },
    '& .carousel-inner': {
      height: '100%'
    },
    '& .react-swipeable-view-container': {
      height: '100%',

      '& .carousel-item': {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    '& .MuiIcon-root': {
      color: 'white'
    }
  }
})

const ImageList: FunctionComponent<{
  content: ImageListStoryblok
}> = (props) => {
  const classes = useStyles()
  const dimensions = useWindowDimensions()
  const containerRef: RefObject<HTMLDivElement> = React.createRef()
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  const [childDimensions, setChildDimensions] = useState({ width: 0, height: 0 })
  const [lightbox, setLightbox] = useState('')

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    let firstChild = element.firstChild
    if (!firstChild) return
    // @ts-ignore
    if (!firstChild.firstElementChild) return
    // @ts-ignore
    let imageContainer = firstChild.firstElementChild.firstElementChild.tagName === 'IMG' ?
      // @ts-ignore
      firstChild.firstElementChild : firstChild.firstElementChild.firstElementChild

    setChildDimensions({
      width: imageContainer.clientWidth,
      height: imageContainer.clientHeight
    })
  }, [dimensions.width])

  const content = props.content
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
  const listItemStyles: CSSProperties = {}
  content.enable_lightbox && (listItemStyles.cursor = 'pointer')

  function onImageClick(element: any) {
    // open lightbox
    content.enable_lightbox && setLightbox(element._uid)
  }

  const imageListItemProps: ImageListItemProps = {
    style: listItemStyles,
    inView,
    width: childDimensions.width,
    height: childDimensions.height,
    aspect_ratio: content.aspect_ratio,
    masonry: content.masonry,
    image_crop: content.image_crop,
    fit_in_color: content.fit_in_color
  }

  const body = content.body || []
  return (
    <SbEditable content={content}>
      <div ref={containerRef}>
        <ul className={imageContainerClasses}
            ref={refIntersectionObserver}>
          {body.map((item, i) => (
            <ImageListItem {...item}
                           {...imageListItemProps}
                           key={item._uid}
                           onImageClick={(ev: any) => onImageClick({ _uid: item._uid, count: i, ...ev })} />
          ))}
        </ul>
      </div>
      {lightbox && ImageListLightbox({
        elements: body,
        lightbox,
        setLightbox,
        dimensions,
        onImageClick,
        className: classes.lightbox
      })}
    </SbEditable>
  )
}

export default ImageList
