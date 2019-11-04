import Image, { ImageListItemProps } from './ImageListItemImg'
import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent, memo } from 'react'
import { ImageListItemStoryblok } from '../../typings/generated/components-schema'
import GridListTile from '@material-ui/core/GridListTile'
import { GridListTileBar } from '@material-ui/core'


const ImageListItem: FunctionComponent<ImageListItemProps> = (props) => {
  return (
    <SbEditable content={props as ImageListItemStoryblok} key={props._uid}>
      <GridListTile className="mdc-image-list__item"
                    style={props.style}
                    onClick={props.onImageClick}>
        <Image {...props} />
        {(props.label) && (
          <GridListTileBar title={props.label} />
        )}
      </GridListTile>
    </SbEditable>
  )
}

export default memo(ImageListItem)
