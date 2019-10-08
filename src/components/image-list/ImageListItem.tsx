import Image, { ImageListItemProps } from './ImageListItemImg'
import SbEditable from 'storyblok-react'
import { FunctionComponent, memo } from 'react'
import { ImageListItemStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'


const ImageListItem: FunctionComponent<ImageListItemProps> = (props) => {
  return (
    <SbEditable content={props as ImageListItemStoryblok} key={props._uid}>
      <li className="mdc-image-list__item"
          style={props.style}
          onClick={props.onImageClick}>
        <Image {...props} />
        {(props.label) && (
          <div className="mdc-image-list__supporting">
            <div className="mdc-image-list__label">{props.label}</div>
          </div>)
        }
      </li>
    </SbEditable>
  )
}

export default memo(ImageListItem)
