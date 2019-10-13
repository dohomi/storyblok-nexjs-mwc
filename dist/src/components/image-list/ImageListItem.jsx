import Image from './ImageListItemImg';
import SbEditable from 'storyblok-react';
import { memo } from 'react';
import * as React from 'react';
var ImageListItem = function (props) {
    return (<SbEditable content={props} key={props._uid}>
      <li className="mdc-image-list__item" style={props.style} onClick={props.onImageClick}>
        <Image {...props}/>
        {(props.label) && (<div className="mdc-image-list__supporting">
            <div className="mdc-image-list__label">{props.label}</div>
          </div>)}
      </li>
    </SbEditable>);
};
export default memo(ImageListItem);
