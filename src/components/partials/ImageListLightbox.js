import {SimpleDialog} from '@rmwc/dialog'
import {IconButton} from '@rmwc/icon-button'
import SwipeableViews from 'react-swipeable-views'
import imageService from '../../utils/ImageService'
import {useState} from 'react'
import React from 'react'

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff'
  },
  slide1: {
    background: '#FEA900'
  },
  slide2: {
    background: '#B3DC4A'
  },
  slide3: {
    background: '#6AC0FF'
  }
}


const SwipePagination = (props) => {
  return (
    <div className="lm-pagination">
      {props.elements.map((item) => (
        <i key={item._uid}
           className="material-icons"
           onClick={() => props.onImageClick(item)}>{props.lightbox === item._uid ? 'radio_button_checked' : 'radio_button_unchecked'}</i>
      ))}
    </div>
  )
}

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
    <>
      <SwipeableViews enableMouseEvents
                      index={currentIndex}
                      onChangeIndex={handleChangeIndex}>
        {props.elements.map(item => (
          <React.Fragment key={item._uid}>
            <span className="helper"></span>
            <img src={getImageSource(item.source)} className='img-fluid'/>
          </React.Fragment>
        ))}
      </SwipeableViews>
      {SwipePagination({...props, currentIndex})}
    </>
  )
}
const ImageListLightbox = (props) => {
  return (
    <SimpleDialog title={IconButton({icon: 'clear', onClick: () => props.setLightbox()})}
                  className="lm-dialog-lightbox"
                  acceptLabel={null}
                  cancelLabel={null}
                  body={Swipe(props)}
                  open={props.lightbox}/>
  )
}

export default ImageListLightbox
