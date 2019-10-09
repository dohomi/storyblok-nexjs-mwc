import { getImageAttrs } from '../../utils/ImageService'
import { componentLogger } from '../../utils/componentLogger'
import { ImageListItemStoryblok, ImageListStoryblok } from '../../typings/generated/components-schema'
import { CSSProperties, FunctionComponent } from 'react'

export type ImageListItemProps =
  Partial<ImageListItemStoryblok>
  & Pick<ImageListStoryblok, 'fit_in_color' | 'aspect_ratio' | 'masonry' | 'image_crop'>
  & {
  width: number
  height: number
  style: CSSProperties
}

const Image: FunctionComponent<ImageListItemProps> = (props) => {
  componentLogger(props)
  let aspectRatioStyles
  let height = props.masonry || !props.aspect_ratio ? 0 : props.height
  const width = props.width
  const styles = {}
  if (props.image_crop) {
    height = props.height
  }
  if (props.aspect_ratio && !props.masonry) {
    const splitAspectRatio: string[] = props.aspect_ratio.split('x')
    // @ts-ignore
    aspectRatioStyles = { paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%` }
  }
  let src = '' // getSource(props.source, {width: 42, height: 42})
  let srcSet = ''
  if (props.inView && props.source) {
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

  function onLoad(ev: any) {
    const target = ev.target as HTMLImageElement
    target.classList.add('loaded')
    target.style.filter = 'blur(0)'
    target.style.backgroundColor = 'transparent'
  }


  if (aspectRatioStyles) {
    return (
      <div className="mdc-image-list__image-aspect-container"
           style={{
             ...aspectRatioStyles,
             ...styles
           }}>
        <img src={src}
             srcSet={srcSet}
             style={{ backgroundColor: 'grey' }}
             className="mdc-image-list__image progressive-img-blur-container"
             onLoad={onLoad}
        />
      </div>
    )
  }

  return (
    <img src={src}
         srcSet={srcSet}
         className="mdc-image-list__image"
         style={styles}
         onLoad={onLoad} />
  )
}

export default Image
