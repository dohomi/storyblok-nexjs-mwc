import SbEditable from 'storyblok-react'
import React, { FunctionComponent, RefObject, useState } from 'react'
import ImageListItem from './ImageListItem'
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
  const containerRef: RefObject<HTMLDivElement> = React.createRef()
  const [lightbox, setLightbox] = useState('')

  let gutterSize = content.column_gap ? Number(content.column_gap) : 2

  function onImageClick(element: any) {
    // open lightbox
    content.enable_lightbox && setLightbox(element._uid)
  }


  const body = content.body || []
  let gridListProps: GridListProps = {
    spacing: gutterSize
    // cols: columnCount
  }
  if (content.masonry) {
    gridListProps.spacing = 0
    delete gridListProps.cols
    gridListProps.style = {
      // columnCount: columnCount,
      columnGap: `${gutterSize}px`
    }
  }
  console.log(gridListProps)
  return (
    <SbEditable content={content}>
      <div ref={containerRef}
           style={{
             padding: gutterSize + 'px'
           }}
           className={clsx(classes.root, {
             [classes.masonry]: content.masonry,
             [classes.aspectRatio]: content.aspect_ratio && !content.masonry,
             ['ratio-' + content.aspect_ratio]: content.aspect_ratio,
             'with-lightbox': content.enable_lightbox
           })}>
        <GridList cellHeight={'auto'}
                  className={gridClasses.gridList}
                  {...gridListProps}
        >
          {body.map((item, i) => (
            <SbEditable content={item} key={item._uid}>
              <GridListTile style={{
                padding: !content.masonry ? `${gutterSize}px` : undefined,
                marginBottom: content.masonry ? `${gutterSize}px` : undefined
              }}
                            onClick={(ev: any) => onImageClick({ _uid: item._uid, count: i, ...ev })}>
                <ImageListItem content={item}
                               listProps={content} />
              </GridListTile>
            </SbEditable>
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
