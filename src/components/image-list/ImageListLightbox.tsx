import React, { FunctionComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Swipe, { ImageListLightboxProps } from './ImageListLightboxSwipe'
import Close from 'mdi-material-ui/Close'

const ImageListLightbox: FunctionComponent<ImageListLightboxProps> = (props) => {
  return (
    <Dialog fullScreen
            className={props.className}
            onEscapeKeyDown={() => props.setLightbox()}
            open={!!props.lightbox}>
      <DialogTitle>
        <IconButton
          className="text-white"
          onClick={() => props.setLightbox()}>
          <Close />
        </IconButton>
      </DialogTitle>
      {Swipe(props)}
    </Dialog>
  )
}

export default ImageListLightbox
