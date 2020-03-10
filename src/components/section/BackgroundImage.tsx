import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import { BackgroundStoryblok, SectionStoryblok } from '../../typings/generated/components-schema'
import Skeleton from '@material-ui/lab/Skeleton'
import clsx from 'clsx'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundSize: 'cover',
    // zIndex: 0
    '&.lm-fixed-bg': {
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      // backgroundSize: 'initial', // not sure why this was set before
      '&.lm-fixed-bg__top': {
        backgroundPosition: 'top'
      },
      [theme.breakpoints.down('sm') + 'and (orientation: portrait)']: {
        backgroundAttachment: 'scroll'
      },
      [theme.breakpoints.down('sm') + 'and (orientation: landscape)']: {
        backgroundAttachment: 'scroll'
      }
    }
  }
}))

const BackgroundImage: FunctionComponent<{ content: BackgroundStoryblok, backgroundStyle?: SectionStoryblok['background_style'] }> = ({ content, backgroundStyle }) => {
  if (!content.image) {
    return null
  }
  const image = content.image as string
  const classes = useStyles()
  const { isDesktop, width, height } = useWindowDimensions()

  const [viewRef, inView, anchorRef] = useInView(intersectionDefaultOptions)
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)
  const disableSmartCrop = content.disable_smart_crop
  const imageFocalPoint = content.image_focal_point
  useEffect(
    () => {
      const current = anchorRef && anchorRef.target as HTMLDivElement
      if (current && inView) {
        let currentWidth = current.clientWidth
        let currentHeight = current.clientHeight
        if (isDesktop) {
          if (backgroundStyle === 'fixed_cover') {
            currentWidth = width
            currentHeight = height
          } else if (backgroundStyle === 'fixed_image') {
            currentHeight = currentHeight + 200
            currentWidth = currentWidth + 200
          }
        }
        const img = getImageAttrs({
          originalSource: image,
          width: currentWidth,
          height: currentHeight,
          smart: !disableSmartCrop,
          focalPoint: imageFocalPoint
        })
        getImage({
          src: img.src,
          srcSet: img.srcSet,
          onReady(imageSource: string) {
            setImgSrc(imageSource)
          }
        })
      }
    },
    [width, height, image, anchorRef, inView, isDesktop, backgroundStyle, disableSmartCrop, imageFocalPoint]
  )

  return (
    <>
      {!imgSrc && <Skeleton width={'100%'} height={'100%'} style={{ position: 'absolute' }} variant="rect" />}
      <Fade in={!!imgSrc} timeout={1000}>
        <div className={clsx(classes.root, {
          'lm-fixed-bg': backgroundStyle === 'fixed_image' || backgroundStyle === 'fixed_cover',
          'lm-fixed-bg__top': backgroundStyle === 'fixed_image',
          'lm-fixed-bg__center': backgroundStyle === 'fixed_cover'
        })}
             style={{
               backgroundImage: imgSrc && `url('${imgSrc}')`,
               backgroundSize: content.background_size ? content.background_size : undefined,
               backgroundPosition: content.background_position ? content.background_position : undefined
             }}
             ref={viewRef}>
        </div>
      </Fade>
    </>
  )
}

export default BackgroundImage
