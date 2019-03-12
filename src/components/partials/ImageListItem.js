import Image from './ImageListItemImg'
import SbEditable from 'storyblok-react'

const ImageListItem = (props) => {
  return (
    <SbEditable content={props} key={props._uid}>
      <li className="mdc-image-list__item"
          style={props.style}
          onClick={props.onImageClick}>
        {Image(props)}
        {(props.label || props.sub_label) && (
          <div className="mdc-image-list__supporting">
            <span className="mdc-image-list__label">{props.label}</span>
          </div>)
        }
      </li>
    </SbEditable>
  )
}

export default ImageListItem
