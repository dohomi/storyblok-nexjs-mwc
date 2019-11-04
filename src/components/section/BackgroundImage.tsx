import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { makeStyles } from '@material-ui/styles'
import Fade from '@material-ui/core/Fade'
import { BackgroundStoryblok, SectionStoryblok } from '../../typings/generated/components-schema'

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
    zIndex: -1
  }
})

const BackgroundImage: FunctionComponent<{ content: BackgroundStoryblok, backgroundStyle: SectionStoryblok['background_style'] }> = ({ content, backgroundStyle }) => {
  if (!content.image) {
    return null
  }
  const image = content.image as string
  const classes = useStyles()
  const { isMobile, width, height } = useWindowDimensions()
  const [viewRef, inView, anchorRef] = useInView(intersectionDefaultOptions)
  const [imgSrc, setImgSrc] = useState<string>('')
  useEffect(
    () => {
      const current = anchorRef && anchorRef.target as HTMLDivElement
      if (current && inView) {
        const width = current.clientWidth
        const height = current.clientHeight
        const img = getImageAttrs({
          originalSource: image,
          width,
          height,
          smart: true
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
    [width, height, image, anchorRef, inView]
  )
  return (
    <Fade in={!!imgSrc} timeout={1000}>
      <div className={classes.root}
           style={{
             backgroundImage: imgSrc && `url('${imgSrc}')`,
             backgroundAttachment: !isMobile && (backgroundStyle === 'fixed_image' || backgroundStyle === 'fixed_cover')
               ? 'fixed'
               : 'inherit'
           }}
           ref={viewRef}>
      </div>
    </Fade>
  )
}

export default BackgroundImage
