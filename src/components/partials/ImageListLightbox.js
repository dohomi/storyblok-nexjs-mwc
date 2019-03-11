import {SimpleDialog} from '@rmwc/dialog'
import {IconButton} from '@rmwc/icon-button'
import SwipeableViews from 'react-swipeable-views'
import imageService from '../../utils/ImageService'


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

const Swipe = (props) => {
  console.log(props.dimensions)
  let path = `${props.dimensions.width - 48}x0`
  if (props.dimensions.width > props.dimensions.height) {
    path = `0x${props.dimensions.height - 68 - 16}`
  }

  function getImageSource (source) {
    return imageService(source, path)
  }

  return (
    <SwipeableViews>
      {props.elements.map(item => (
        <>
          <span className="helper"></span>
          <img src={getImageSource(item.source)} className='img-fluid' key={item._uid}/>
        </>
      ))}
    </SwipeableViews>
  )
}
const ImageListLightbox = (props) => {
  console.log(props)

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
