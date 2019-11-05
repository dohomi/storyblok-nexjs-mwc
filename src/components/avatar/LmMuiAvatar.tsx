import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { getImageAttrs } from '../../utils/ImageService'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  small: {
    width: 24,
    height: 24
  },
  large: {
    width: 52,
    height: 52
  },
  xlarge: {
    width: 64,
    height: 64
  }
})

const LmMuiAvatar: FunctionComponent<{ src: string, size: 'small' | 'large' | 'xlarge' | undefined }> = ({ src, size }) => {
  const classes = useStyles()
  const [reference, inView] = useInView(intersectionDefaultOptions)
  const [imageAttrs, setImageSrc] = useState<{ src: string, srcSet: string }>({ src: '', srcSet: '' })
  useEffect(
    () => {
      if (!inView) {
        return
      }
      const imgAttrs = getImageAttrs({ originalSource: src, width: 128 })
      setImageSrc(imgAttrs)
    },
    [inView]
  )

  return (
    <Avatar ref={reference}
            src={imageAttrs.src}
            srcSet={imageAttrs.src}
            className={classes[size as string]} />
  )
}

export default LmMuiAvatar
