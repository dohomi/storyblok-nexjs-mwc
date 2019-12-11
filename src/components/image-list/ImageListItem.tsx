import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent, memo, useMemo, useState } from 'react'
import { ImageListItemStoryblok, ImageListStoryblok } from '../../typings/generated/components-schema'
import { Fade, GridListTileBar } from '@material-ui/core'
import { useInView } from 'react-intersection-observer'
import { getImageAttrs } from '../../utils/ImageService'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { Skeleton } from '@material-ui/lab'

export type ImageListItemProps =
  Partial<ImageListItemStoryblok>
  & Pick<ImageListStoryblok, 'fit_in_color' | 'aspect_ratio' | 'masonry' | 'image_crop'>
  & {
  width: number
  height: number
}

const ImageListItem: FunctionComponent<ImageListItemProps> = (props) => {
  const [inViewRef, inView] = useInView(intersectionDefaultOptions)
  const [loaded, setLoaded] = useState<boolean>(false)
  let height = props.masonry || !props.aspect_ratio ? 0 : props.height
  const width = props.width
  const styles = {}
  const imageProps = useMemo<{
    src?: string,
    srcSet?: string
  }>(
    () => {
      if (inView && props.source) {
        if (props.image_crop || (!props.masonry && !props.fit_in_color)) {
          height = props.height
        }
        return getImageAttrs({
          originalSource: props.source,
          width,
          height,
          smart: props.image_crop === 'smart',
          fitInColor: props.fit_in_color
        })
      }
      return {}
    },
    [inView, props.source]
  )

  function onLoad() {
    setLoaded(true)
  }

  return (
    <SbEditable content={props as ImageListItemStoryblok} key={props._uid}>
      <>
        {!loaded && <Skeleton width={'100%'} height={'100%'} style={{ position: 'absolute' }} />}
        <Fade in={loaded}>
          <img {...imageProps}
               ref={inViewRef}
               style={styles}
               alt={'image list item'}
               onLoad={onLoad} />
        </Fade>
        {(props.label) && (
          <GridListTileBar title={props.label} />
        )}
      </>
    </SbEditable>
  )
}

export default memo(ImageListItem)
