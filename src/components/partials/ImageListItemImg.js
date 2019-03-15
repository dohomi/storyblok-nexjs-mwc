import imageService from '../../utils/ImageService'

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
  const childDimensions = props.childDimensions
  let aspectRatioStyles
  let height = props.masonry || !props.aspectRatio ? 0 : childDimensions.height
  const width = childDimensions.width
  let crop = props.crop
  const styles = {}
  if (crop) {
    height = childDimensions.height
  }
  if (props.aspectRatio && !props.masonry) {
    const splitAspectRatio = props.aspectRatio.split('x')
    aspectRatioStyles = {paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%`}
  }
  let src = getSource(props.source, {width: 42, height: 42})
  if (props.inView) {
    src = getSource(props.source, {width, height, crop: crop, fitInColor: props.fitInColor})
    styles.filter = 'blur(0)'
  } else {
    styles.filter = 'blur(10px)'
  }

  if (aspectRatioStyles) {
    return (
      <div className="mdc-image-list__image-aspect-container progressive-img-container"
           style={{
             ...aspectRatioStyles,
             ...styles
           }}>
        <img src={src} className="mdc-image-list__image"/>
      </div>
    )
  }
  return (
    <img src={src} className="mdc-image-list__image" style={styles}/>
  )
}

export default Image
