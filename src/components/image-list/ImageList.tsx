import SbEditable from 'storyblok-react'
import React, { FunctionComponent, RefObject, useEffect, useState } from 'react'
import ImageListItem, { ImageListItemProps } from './ImageListItem'
import ImageListLightbox from './ImageListLightbox'
import { ImageListStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { makeStyles } from '@material-ui/core/styles'
import GridList, { GridListProps } from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import clsx from 'clsx'

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
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '& .carousel-indicators': {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center'
    },
    '& .carousel-control-next, & .carousel-control-prev': {
      position: 'absolute',
      height: '100%',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        fontSize: '4rem',
        color: 'rgba(255,255,255,0.8)'
      }
    },
    '& .carousel-control-next': {
      right: 0
    }
  },
  root: {
    overflowX: 'hidden',
    '&.with-lightbox': {}
  },
  aspectRatio: {
    '& .MuiGridListTile-tile': {
      paddingBottom: '56.25%',
      '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }
    },
    '&.ratio-1x1 .MuiGridListTile-tile': {
      paddingBottom: '100%'
    },
    '&.ratio-4x3 .MuiGridListTile-tile': {
      paddingBottom: '75%'
    },
    '&.ratio-3x2 .MuiGridListTile-tile': {
      paddingBottom: '66.66%'
    },
    '&.ratio-16x9 .MuiGridListTile-tile': {
      paddingBottom: '56.25%'
    },
    '&.ratio-3x4 .MuiGridListTile-tile': {
      paddingBottom: '133.33%'
    },
    '&.ratio-2x3 .MuiGridListTile-tile': {
      paddingBottom: '150%'
    }
  },
  masonry: {
    '& img': {
      marginBottom: -4
    },
    '& .MuiGridList-root': {
      display: 'block'
    },
    '& .MuiGridListTile-root': {
      width: 'auto !important',
      breakInside: 'avoid-column',
      position: 'relative'
    }
  }
})

const ImageList: FunctionComponent<{
  content: ImageListStoryblok
}> = (props) => {
  const classes = useStyles()
  const dimensions = useWindowDimensions()
  const { width, isMobileWidth, isTabletWidth } = dimensions
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

  const content = props.content
  let gutterSize = content.column_gap ? Number(content.column_gap) : 2
  let columnCount = content.column_count ? Number(content.column_count) : 5
  if (isTabletWidth && content.column_count_tablet) {
    columnCount = Number(content.column_count_tablet)
  } else if (isMobileWidth) {
    columnCount = content.column_count_phone ? Number(content.column_count_phone) : 1
  }

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
    spacing: gutterSize,
    cols: columnCount
  }
  if (content.masonry) {
    delete gridListProps.spacing
    delete gridListProps.cols
    gridListProps.style = {
      columnCount: columnCount,
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
