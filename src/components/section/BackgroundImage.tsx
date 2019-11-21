import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { makeStyles } from '@material-ui/styles'
import Fade from '@material-ui/core/Fade'
import { BackgroundStoryblok, SectionStoryblok } from '../../typings/generated/components-schema'
import Skeleton from '@material-ui/lab/Skeleton'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#ccc',
    // zIndex: 0
    '&.lm-fixed-bg': {
      backgroundAttachment: 'fixed',
      backgroundSize: 'initial',
      '&.lm-fixed-bg__top': {
        backgroundPosition: 'top'
      }
    }
  }
})

const BackgroundImage: FunctionComponent<{ content: BackgroundStoryblok, backgroundStyle?: SectionStoryblok['background_style'] }> = ({ content, backgroundStyle }) => {
  if (!content.image) {
    return null
  }
  const image = content.image as string
  const classes = useStyles()
  const { isDesktop, width, height } = useWindowDimensions()
  const isFixedBackground = isDesktop && (backgroundStyle === 'fixed_image' || backgroundStyle === 'fixed_cover')

  const [viewRef, inView, anchorRef] = useInView(intersectionDefaultOptions)
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)
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
          smart: true
        })
        getImage({
          src: img.src,
          srcSet: img.srcSet,
          onReady(imageSource: string) {
            console.log(imageSource)
            setImgSrc(imageSource)
          }
        })
      }
    },
    [width, height, image, anchorRef, inView, isDesktop, backgroundStyle]
  )
  return (
    <>
      {!imgSrc && <Skeleton width={'100%'} height={'100%'} style={{ position: 'absolute' }} />}
      <Fade in={!!imgSrc} timeout={1000}>
        <div className={clsx(classes.root, {
          'lm-fixed-bg': isFixedBackground,
          'lm-fixed-bg__top': backgroundStyle === 'fixed_image',
          'lm-fixed-bg__center': backgroundStyle === 'fixed_cover'
        })}
             style={{
               backgroundImage: imgSrc && `url('${imgSrc}')`
             }}
             ref={viewRef}>
        </div>
      </Fade>
    </>
  )
}

export default BackgroundImage
