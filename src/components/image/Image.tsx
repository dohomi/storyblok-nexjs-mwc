import SbEditable from 'storyblok-react'
import React, { FunctionComponent, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'react-intersection-observer'
import { getImageAttrs } from '../../utils/ImageService'
import { ImageStoryblok } from '../../typings/generated/components-schema'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-block',
    margin: '0 0 -6px 0 !important',
    // margin: '0 !important',
    overflow: 'auto',
    padding: 0,
    position: 'relative'
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    '&.img-thumbnail': {
      padding: '.25rem',
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius
    },
    '&.square, &.rounded-0': {
      borderRadius: 0
    },
    '&.rounded': {
      borderRadius: theme.shape.borderRadius
    },
    '&.rounded-circle': {
      borderRadius: '50%'
    }
  }
}))

const Image: FunctionComponent<{
  content: ImageStoryblok
}> = ({ content }) => {
  const classes = useStyles()
  const { isMobile } = useDeviceDimensions()
  const [loaded, setLoaded] = useState<boolean>(false)
  const imageCrop = content.image_crop || []
  const property = content.property || []
  const fitInColor = (content.color && content.color.rgba) || content.fit_in_color


  const [refIntersectionObserver, inView, intersectionElement] = useInView(intersectionDefaultOptions)

  const imgProperties = useMemo(
    () => {
      if (inView && content.source) {
        const parentElement = intersectionElement && intersectionElement.target.parentElement
        let parentElementDimensions = (parentElement && parentElement.getBoundingClientRect()) || { width: 0 }
        const square = property.includes('rounded-circle') || property.includes('square')
        let definedWidth = content.width
        let definedHeight = content.height_xs && isMobile ? content.height_xs : content.height
        const width = Math.ceil(parentElementDimensions.width)
        if ((!definedWidth && !definedHeight) || imageCrop.length || fitInColor) {
          // default: set available width to the current width either in crop mode
          definedWidth = definedWidth || width
        }
        if (square) {
          // overwrite if square
          const iconSize = definedHeight || definedWidth || 64
          definedWidth = iconSize
          definedHeight = iconSize
        }
        if (content.height_fill) {
          const grandParentDim = (parentElement && parentElement.parentElement && parentElement.parentElement.getBoundingClientRect()) || {
            width: 0,
            height: 0
          }
          // with a tolerance of 200 height should fit grandparents height
          if (grandParentDim.width > parentElementDimensions.width + 200) {
            definedHeight = Math.ceil(grandParentDim.height)
          }
        }
        if (content.focal_point && parentElement && !definedHeight) {
          const parentDim = parentElement.getBoundingClientRect() || {
            width: 0,
            height: 0
          }
          if (parentDim) {
            definedHeight = Math.ceil(parentDim.height)
          }
        }

        const imgAttrs = getImageAttrs({
          originalSource: content.source,
          width: Number(definedWidth || 0),
          height: definedHeight,
          fitInColor,
          focalPoint: content.focal_point,
          smart: imageCrop.includes('smart_crop')
        })

        return {
          ...imgAttrs,
          width: content.width ? content.width : undefined,
          height: definedHeight ? definedHeight : undefined,
          style: {
            width: content.width ? `${content.width}px` : 'auto',
            maxHeight: 'inherit',
            height: definedHeight ? `${definedHeight}px` : 'auto'
          }
        }
      } else {
        return {
          width: content.width ? content.width : undefined,
          height: content.height ? content.height : undefined,
          style: {
            width: content.width ? `${content.width}px` : 'auto',
            maxHeight: 'inherit',
            height: content.height ? `${content.height}px` : 'auto'
          }
        }
      }
    },
    [inView, content.source]
  )

  function onImageLoaded() {
    setLoaded(true)
  }


  return (
    <SbEditable content={content}>
      <figure ref={refIntersectionObserver}
              className={classes.root}
              style={{
                height: content.height ? `${content.height}px` : content.height_fill ? '100%' : undefined,
                width: content.width ? `${content.width}px` : content.height_fill ? '100%' : undefined
              }}>
        {!loaded && <Skeleton style={{ position: 'absolute' }} width={'100%'} height={'100%'}
                              variant={property.includes('rounded-circle') ? 'circle' : 'rect'} />}
        <Fade in={loaded}>
          <img {...imgProperties}
               alt={content.alt || 'website image'}
               className={clsx(classes.image, content.property, content.class_names?.values)}
               onLoad={onImageLoaded} />
        </Fade>
      </figure>
    </SbEditable>
  )
}

export default Image
