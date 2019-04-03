import imageService from '../../utils/ImageService'
import {componentLogger} from '../../utils/componentLogger'
import {memo} from 'react'

function getSource (source, {width, height, crop, fitInColor}) {
  let filter = ''
  let path = `${width}x${height}`
  if (crop === 'fit_in') {
    path = 'fit-in/' + path
    filter = `:fill(${fitInColor || 'transparent'})`
  }
  if (crop === 'smart') {
    path += '/smart'
  }
  return imageService(source, path, filter)
}

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
  if (props.inView) {
    src = getSource(props.source, {width, height, crop: crop, fitInColor: props.fitInColor})
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
        <img src={src} style={{backgroundColor: 'grey'}} className="mdc-image-list__image progressive-img-blur-container"
             onLoad={onLoad}/>
      </div>
    )
  }

  return (
    <img src={src} className="mdc-image-list__image" style={styles} onLoad={onLoad}/>
  )
}

export default Image
