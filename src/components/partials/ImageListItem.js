import Image from './ImageListItemImg'
import SbEditable from 'storyblok-react'

const ImageListItem = (props) => {
  return (
    <SbEditable content={props}>
      <li className="mdc-image-list__item"
          key={props._uid}
          style={props.style}
          onClick={props.onImageClick}>
        {Image(props)}
        <div className="mdc-image-list__supporting">
          <span className="mdc-image-list__label">{props.label}</span>
        </div>
      </li>
    </SbEditable>
  )
}

export default ImageListItem
