import { getImageAttrs } from '../../utils/ImageService'
import { getImage } from '../../utils/fetchImageHelper'
import React, { FunctionComponent, useEffect } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { makeStyles } from '@material-ui/styles'

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
    opacity: 0,
    backgroundColor: '#ccc',
    zIndex: -1
  }
})

const BackgroundImage: FunctionComponent<{ image: string }> = ({ image }) => {
  const classes = useStyles()
  const dimensions = useWindowDimensions()
  const [viewRef, inView, anchorRef] = useInView(intersectionDefaultOptions)
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
            current.style.filter = 'blur(0)'
            current.style.backgroundImage = `url('${imageSource}')`
            current.style.opacity = '1'
          }
        })
      }
    },
    [dimensions, image, anchorRef, inView]
  )
  return (
    <div className={classes.root}
         ref={viewRef}>
    </div>
  )
}

export default BackgroundImage
