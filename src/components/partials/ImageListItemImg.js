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

  crop && (height = childDimensions.height)
  if (props.aspectRatio && !props.masonry) {
    const splitAspectRatio = props.aspectRatio.split('x')
    aspectRatioStyles = {paddingBottom: `${splitAspectRatio[1] / splitAspectRatio[0] * 100}%`}
  }
  let src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  if (props.inView) {
    src = getSource(props.source, {width, height, crop: crop, fitInColor: props.fitInColor})
  }

  if (aspectRatioStyles) {
    return (
      <div className="mdc-image-list__image-aspect-container" style={aspectRatioStyles}>
        <img src={src} className="mdc-image-list__image"/>
      </div>
    )
  }
  return (
    <img src={src} className="mdc-image-list__image"/>
  )
}

export default Image
