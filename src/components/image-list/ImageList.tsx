import SbEditable from 'storyblok-react'
import React, { FunctionComponent, RefObject, useEffect, useState } from 'react'
import ImageListItem, { ImageListItemProps } from './ImageListItem'
import ImageListLightbox from './ImageListLightbox'
import { ImageListStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import GridList, { GridListProps } from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import clsx from 'clsx'
import { useGridListStyles } from '../card/cardListStyles'
import { useImageListStyles } from './useImageListStyles'


const ImageList: FunctionComponent<{
  content: ImageListStoryblok
}> = (props) => {
  const content = props.content
  const classes = useImageListStyles()
  const gridClasses = useGridListStyles({
    columnCount: content.column_count,
    columnCountPhone: content.column_count_phone,
    columnCountTablet: content.column_count_tablet,
    isMasonry: !!content.masonry
  })
  const dimensions = useWindowDimensions()
  const { width } = dimensions
  const containerRef: RefObject<HTMLDivElement> = React.createRef()
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
  }, [width])

  let gutterSize = content.column_gap ? Number(content.column_gap) : 2
  // let columnCount = content.column_count ? Number(content.column_count) : 5
  // if (isTabletWidth && content.column_count_tablet) {
  //   columnCount = Number(content.column_count_tablet)
  // } else if (isMobileWidth) {
  //   columnCount = content.column_count_phone ? Number(content.column_count_phone) : 1
  // }

  function onImageClick(element: any) {
    // open lightbox
    content.enable_lightbox && setLightbox(element._uid)
  }

  const imageListItemProps: ImageListItemProps = {
    width: childDimensions.width,
    height: childDimensions.height,
    aspect_ratio: content.aspect_ratio,
    masonry: content.masonry,
    image_crop: content.image_crop,
    fit_in_color: content.fit_in_color
  }

  const body = content.body || []
  let gridListProps: GridListProps = {
    spacing: gutterSize
    // cols: columnCount
  }
  if (content.masonry) {
    delete gridListProps.spacing
    delete gridListProps.cols
    gridListProps.style = {
      // columnCount: columnCount,
      columnGap: `${gutterSize}px`
    }
  }
  return (
    <SbEditable content={content}>
      <div ref={containerRef}
           style={{
             padding: gutterSize + 'px'
           }}
           className={clsx(classes.root, content.masonry ? classes.masonry : classes.aspectRatio, {
             ['ratio-' + content.aspect_ratio]: content.aspect_ratio,
             'with-lightbox': content.enable_lightbox
           })}>
        <GridList cellHeight={'auto'}
                  className={gridClasses.gridList}
                  {...gridListProps}
        >
          {body.map((item, i) => (
            <GridListTile key={item._uid}
                          onClick={(ev: any) => onImageClick({ _uid: item._uid, count: i, ...ev })}>
              <ImageListItem {...item}
                             {...imageListItemProps} />
            </GridListTile>
          ))}
        </GridList>
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
