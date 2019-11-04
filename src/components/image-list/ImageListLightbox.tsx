import React, { FunctionComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Swipe, { ImageListLightboxProps } from './ImageListLightboxSwipe'

const ImageListLightbox: FunctionComponent<ImageListLightboxProps> = (props) => {
  return (
    <Dialog fullScreen
            className={props.className}
            onEscapeKeyDown={() => props.setLightbox()}
            open={!!props.lightbox}>
      <DialogTitle>
        <IconButton
          onClick={() => props.setLightbox()}>
          <Icon>clear</Icon>
        </IconButton>
      </DialogTitle>
      {Swipe(props)}
    </Dialog>
  )
}

export default ImageListLightbox
