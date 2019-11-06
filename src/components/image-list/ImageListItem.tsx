import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent, memo, useState } from 'react'
import { ImageListItemStoryblok, ImageListStoryblok } from '../../typings/generated/components-schema'
import { Fade, GridListTileBar } from '@material-ui/core'
import { useInView } from 'react-intersection-observer'
import { getImageAttrs } from '../../utils/ImageService'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

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

  // if (props.aspect_ratio && !props.masonry) {
  //   const splitAspectRatio: string[] = props.aspect_ratio.split('x')
  //   // @ts-ignore
  //   aspectRatioStyles = { paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%` }
  // }
  let src = '' // getSource(props.source, {width: 42, height: 42})
  let srcSet = ''
  if (inView && props.source) {
    if (props.image_crop) {
      height = props.height
    }
    const imgAttrs = getImageAttrs({
      originalSource: props.source,
      width,
      height,
      smart: props.image_crop === 'smart',
      fitInColor: props.fit_in_color
    })
    src = imgAttrs.src
    srcSet = imgAttrs.srcSet
  }

  function onLoad() {
    setLoaded(true)
  }

  return (
    <SbEditable content={props as ImageListItemStoryblok} key={props._uid}>
      <>
        <Fade in={loaded}>
          <img src={src}
               ref={inViewRef}
               srcSet={srcSet}
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
