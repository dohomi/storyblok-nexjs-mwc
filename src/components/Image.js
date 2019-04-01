import Image from './partials/Image'
import ImageSvg from './partials/ImageSvg'

const ImageElement = (props) => {
  const isSvgImage = props.content.source && props.content.source.endsWith('.svg')
  if (isSvgImage) {
    return <ImageSvg {...props}/>
  }
  return <Image {...props}/>
}

export default ImageElement

