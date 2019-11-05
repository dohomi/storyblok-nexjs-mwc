import SbEditable from 'storyblok-react'
import React, { CSSProperties, FunctionComponent, RefObject, useEffect, useState } from 'react'
import ImageListItem, { ImageListItemProps } from './ImageListItem'
import ImageListLightbox from './ImageListLightbox'
import { ImageListStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
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
        justifyContent: 'center'
      }
    },
    '& .MuiIcon-root': {
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
      '& .MuiIcon-root': {
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
  }
})

const ImageList: FunctionComponent<{
  content: ImageListStoryblok
}> = (props) => {
  const classes = useStyles()
  const dimensions = useWindowDimensions()
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
  }, [dimensions.width])

  const content = props.content
  let gutterSize = content.column_gap || 2
  let columnCount = content.column_count || 5
  let columnCountTablet = content.column_count_tablet || 4
  let columnCountPhone = content.column_count_phone || 1


  // const imageContainerClasses = clsx(
  //   'mdc-image-list',
  //   {
  //     'mdc-image-list--masonry': !!content.masonry,
  //     'mdc-image-list--with-text-protection': !!content.text_protection,
  //     [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCount}-desktop-${gutterSize}`]: true,
  //     [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCountTablet}-tablet-${gutterSize}`]: true,
  //     [`lm-image-list${content.masonry ? '-masonry' : ''}__column-${columnCountPhone}-phone-${gutterSize}`]: true
  //   }
  // )
  const listItemStyles: CSSProperties = {}
  content.enable_lightbox && (listItemStyles.cursor = 'pointer')

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
  return (
    <SbEditable content={content}>
      <div ref={containerRef}
           className={clsx(classes.root, 'ratio-' + content.aspect_ratio)}>
        <GridList cols={3}
                  cellHeight={'auto'}
                  spacing={content.column_gap ? Number(content.column_gap) : 4}>
          {body.map((item, i) => (
            <GridListTile style={listItemStyles}
                          key={item._uid}
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
