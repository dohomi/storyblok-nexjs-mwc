import Image from './ImageListItemImg'

const ImageListItem = (props) => {
  return (
    <li className="mdc-image-list__item"
        key={props._uid}
        style={props.style}
        onClick={props.onImageClick}>
      {Image(props)}
      <div className="mdc-image-list__supporting">
        <span className="mdc-image-list__label">{props.label}</span>
      </div>
    </li>
  )
}

export default ImageListItem
