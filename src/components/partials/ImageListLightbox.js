import {
  Dialog,
  DialogTitle,
  DialogContent
} from '@rmwc/dialog'

import {IconButton} from '@rmwc/icon-button'
import SwipeableViews from 'react-swipeable-views'
import imageService from '../../utils/ImageService'

import React from 'react'

const Swipe = (props) => {
  let currentIndex = props.elements.findIndex(i => i._uid === props.lightbox)

  function getImageSource (source) {
    let dimensionHeight = props.dimensions.height - 68 - 16
    let dimensionWidth = props.dimensions.width - 48

    const originalDimension = source.split('/f/')[1].split('/')[1].split('x').map(i => parseInt(i))
    const imgWidth = originalDimension[0]
    const imgHeight = originalDimension[1]
    dimensionWidth = imgWidth <= dimensionWidth ? imgWidth : dimensionWidth
    dimensionHeight = imgHeight <= dimensionHeight ? imgHeight : dimensionHeight
    let path = `${dimensionWidth}x0`
    if (dimensionWidth > dimensionHeight) {
      path = `0x${dimensionHeight}`
    }

    return imageService(source, path)
  }

  function handleChangeIndex (index) {
    props.onImageClick(props.elements[index])
  }

  return (
    <div className="carousel slide">
      <SwipeableViews index={currentIndex}
                      className="carousel-inner h-100 text-center"
                      onChangeIndex={handleChangeIndex}>
        {props.elements.map(item => (
          <div key={item._uid} className="carousel-item d-block">
            <img
              src={getImageSource(item.source)}
              className='img-fluid'/>
          </div>
        ))}
      </SwipeableViews>
      <a className="carousel-control-prev"
         role="button"
         onClick={() => props.onImageClick(currentIndex === 0 ? props.elements[props.elements.length - 1] : props.elements[currentIndex - 1])}>
        <IconButton icon="arrow_back_ios"/>
      </a>
      <a className="carousel-control-next"
         role="button"
         onClick={() => props.onImageClick(currentIndex === props.elements.length - 1 ? props.elements[0] : props.elements[currentIndex + 1])}>
        <IconButton icon="arrow_forward_ios"/>
      </a>
      <ol className="carousel-indicators" style={{color: 'white'}}>
        {props.elements.map((item) => (
          <li className={`${props.lightbox === item._uid ? 'active' : ''}`}
              onClick={() => props.onImageClick(item)}
              key={item._uid}>
          </li>
        ))}
      </ol>
    </div>
  )
}
const ImageListLightbox = (props) => {
  return (
    <Dialog className="lm-dialog-lightbox"
            open={props.lightbox}>
      <DialogTitle className="pb-0 text-white text-right">{IconButton({
        icon: 'clear',
        onClick: () => props.setLightbox()
      })}</DialogTitle>
      <DialogContent className="pb-0 h-100">{Swipe(props)}</DialogContent>
    </Dialog>
  )
}

export default ImageListLightbox
