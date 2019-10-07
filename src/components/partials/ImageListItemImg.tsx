import {getImageAttrs} from '../../utils/ImageService'
import {componentLogger} from '../../utils/componentLogger'

const Image = (props) => {
  componentLogger(props)
  let aspectRatioStyles
  let height = props.masonry || !props.aspectRatio ? 0 : props.height
  const width = props.width
  let crop = props.crop
  const styles = {}
  if (crop) {
    height = props.height
  }
  if (props.aspectRatio && !props.masonry) {
    const splitAspectRatio = props.aspectRatio.split('x')
    aspectRatioStyles = {paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%`}
  }
  let src = '' // getSource(props.source, {width: 42, height: 42})
  let srcSet = ''
  if (props.inView && props.source) {
    // src = getSource(props.source, {width, height, crop: crop, fitInColor: props.fitInColor})
    const imgAttrs = getImageAttrs({
      originalSource: props.source,
      width,
      height,
      smart: crop === 'smart',
      fitInColor: props.fitInColor
    })
    src = imgAttrs.src
    srcSet = imgAttrs.srcSet
  }

  function onLoad (ev) {
    const target = ev.target
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
             style={{backgroundColor: 'grey'}}
             className="mdc-image-list__image progressive-img-blur-container"
             onLoad={onLoad}/>
      </div>
    )
  }

  return (
    <img src={src}
         srcSet={srcSet}
         className="mdc-image-list__image"
         style={styles}
         onLoad={onLoad}/>
  )
}

export default Image
