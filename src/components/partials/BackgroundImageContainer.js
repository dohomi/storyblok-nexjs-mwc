import {getImageSource} from '../../utils/ImageService'
import {fetchImageSource} from '../../utils/fetchImageHelper'
import withWindowDimensions from '../provider/WithWindowDimensions'
import React, {useEffect} from 'react'

const BackgroundImage = ({image, dimensions}) => {
  const createRef = React.createRef()
  useEffect(
    () => {
      const current = createRef.current
      if (current) {
        const width = current.clientWidth
        const height = current.clientHeight
        const imageSource = getImageSource({image, width, height})
        fetchImageSource(imageSource)
          .then(() => {
            current.style.filter = 'blur(0)'
          })
        current.style.backgroundImage = `url('${imageSource}')`
      }
    },
    [dimensions, image]
  )
  return (
    <div className="lm-background-image lm-background__absolute-fill progressive-img-container"
         ref={createRef}>
    </div>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(BackgroundImage)
