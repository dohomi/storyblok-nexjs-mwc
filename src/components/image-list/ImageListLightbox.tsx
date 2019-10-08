import React, { FunctionComponent } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@rmwc/dialog'
import { IconButton } from '@rmwc/icon-button'
import SwipeableViews from 'react-swipeable-views'
import { getImageAttrs, getOriginalImageDimensions } from '../../utils/ImageService'
import { WithWindowDimensionsProps } from '../provider/WithWindowDimensions'
import { ImageListItemStoryblok } from '../../typings/generated/components-schema'

type ImageListLightboxProps = {
  elements: ImageListItemStoryblok[]
  lightbox: string
  setLightbox: Function
  onImageClick: Function
  dimensions: WithWindowDimensionsProps
}

const Swipe: FunctionComponent<ImageListLightboxProps> = (props) => {
  let currentIndex = props.elements.findIndex(i => i._uid === props.lightbox)

  function getImageSource(source) {
    let dimensionHeight = props.dimensions.height - 68 - 16
    let dimensionWidth = props.dimensions.width - 48
    const originalDimension = getOriginalImageDimensions(source)
    const imgWidth = originalDimension.width
    const imgHeight = originalDimension.height
    dimensionWidth = imgWidth <= dimensionWidth ? imgWidth : dimensionWidth
    dimensionHeight = imgHeight <= dimensionHeight ? imgHeight : dimensionHeight
    const landscape = dimensionWidth > dimensionHeight
    return getImageAttrs({
      originalSource: source,
      width: landscape ? 0 : dimensionWidth,
      height: landscape ? dimensionHeight : 0
    })
  }

  function handleChangeIndex(index) {
    props.onImageClick(props.elements[index])
  }

  return (
    <div className="carousel slide">
      <SwipeableViews index={currentIndex}
                      className="carousel-inner h-100 text-center"
                      onChangeIndex={handleChangeIndex}>
        {props.elements.map(item => (
          <div key={item._uid} className="carousel-item d-block">
            <img {...getImageSource(item.source)}
                 className='img-fluid' />
          </div>
        ))}
      </SwipeableViews>
      <a className="carousel-control-prev"
         role="button"
         onClick={() => props.onImageClick(currentIndex === 0 ? props.elements[props.elements.length - 1] : props.elements[currentIndex - 1])}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next"
         role="button"
         onClick={() => props.onImageClick(currentIndex === props.elements.length - 1 ? props.elements[0] : props.elements[currentIndex + 1])}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <ol className="carousel-indicators" style={{ color: 'white' }}>
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

const ImageListLightbox: FunctionComponent<ImageListLightboxProps> = (props) => {
  return (
    <Dialog className="lm-dialog-lightbox"
            open={!!props.lightbox}>
      <DialogTitle className="pb-0 text-white text-right">{IconButton({
        icon: 'clear',
        onClick: () => props.setLightbox()
      })}</DialogTitle>
      <DialogContent className="pb-0 h-100">{Swipe(props)}</DialogContent>
    </Dialog>
  )
}

export default ImageListLightbox
