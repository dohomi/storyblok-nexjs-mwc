import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'
import imageService from '../../utils/ImageService'

const ProgressiveImage = (props) => {
  let [source, setSource] = useState('')

  if (!props.src) {
    console.error('you must add preview and src props')
    return null
  }

  useEffect(() => {
    const currentSrc = props.src
    if (props.inView && props.width > 0 && props.height > 0) {
      fetch(currentSrc)
        .then((src) => {
          triggerChange(src)
        })
    } else if (!props.inView && !source) {
      fetch(currentSrc, true)
        .then(src => {
          triggerChange(src, true)
        })
    }
  }, [props.inView, props.width, props.height])


  /**
   *
   * @param src
   * @param [isPreview]
   * @return {Promise<any>}
   */
  function fetch (src, isPreview) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const imgSource = isPreview ? getImgSource(42, 42) : getImgSource(props.width, props.height)
      img.src = imgSource
      img.addEventListener('load', () => resolve(imgSource), false)
      img.addEventListener('error', (e) => reject(e))
    })
  }

  /**
   *
   * @param width
   * @param height
   * @return {*}
   */
  function getImgSource (width, height) {
    let path = ''
    if (!props.contain) {
      path = `${parseInt(width)}x${parseInt(height)}`
      if (props.smartCrop) {
        path += '/smart'
      }
    }
    return imageService(props.src, path)
  }

  function getStyle (blur) {
    const {transitionTime, timingFunction} = props
    return {
      filter: `blur(${blur}px)`,
      transition: `filter ${transitionTime || 500}ms ${timingFunction || 'ease'}`
    }
  }

  /**
   *
   * @param src
   * @param [isPreview]
   */
  function triggerChange (src, isPreview) {
    const blur = isPreview ? props.blur || 10 : 0
    setSource(src)
    props.onChange && props.onChange({src, style: getStyle(blur)})
  }

  return (
    <>
      {props.children}
    </>
  )
}

ProgressiveImage.propTypes = {
  preview: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
  children: PropTypes.element,
  transitionTime: PropTypes.number,
  initialBlur: PropTypes.number,
  timingFunction: PropTypes.string,
  inView: PropTypes.bool,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  onChange: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  smartCrop: PropTypes.bool,
  contain: PropTypes.bool
}

export default ProgressiveImage

