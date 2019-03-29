import SbEditable from 'storyblok-react'
import imageService from '../utils/ImageService'
import clsx from 'clsx'
import {useInView} from 'react-intersection-observer'
import React, {useEffect, useState} from 'react'
import withWindowDimensions from './provider/WithWindowDimensions'
import {fetchImageSource} from '../utils/fetchImageHelper'
import SVG from 'react-inlinesvg'

/**
 *
 * @param content
 * @param width
 * @param height
 * @return {*}
 */
function getSource (content, {width, height}) {
  width = parseInt(width)
  const imageCrop = content.image_crop || []
  const property = content.property || []
  let availableWidth = content.width || 0
  let availableHeight = content.height || 0

  if ((!availableWidth && !availableHeight) || imageCrop.length || content.fit_in_color) {
    // default: set available width to the current width either in crop mode
    availableWidth = availableWidth || width
  }
  if (property.includes('rounded-circle') || property.includes('square')) {
    // overwrite if square
    const iconSize = availableHeight || availableWidth || '64'
    availableWidth = iconSize
    availableHeight = iconSize
  }
  let filter = ''
  let path = `${availableWidth}x${availableHeight}`

  if (content.fit_in_color) {
    path = 'fit-in/' + path
    filter = `:fill(${content.fit_in_color})`
  } else if (imageCrop.includes('smart_crop')) {
    path += '/smart'
  }
  return imageService(content.source, path, filter)
}

// function getSmallSource (content) {
//   return imageService(content.source, '42x42')
// }


const Image = (props) => {
  const width = props.dimensions.width
  const height = props.dimensions.height

  const [refIntersectionObserver, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  const [imageProps, setImageProps] = useState({
    src: '',
    style: {}
  })

  const content = props.content
  const className = clsx('img-fluid', 'progressive-img-container', content.property)
  const containerClasses = clsx('w-100')
  const isSvgImage = content.source.endsWith('.svg')
  if (isSvgImage) {

    const src = inView ? 'https:' + content.source : ''

    const afterSvgLoaded = () => {
      console.log('loaded')
      // document.getElementById(props._uid).style.filter = 'blur(0)'
    }

    return (
      <SbEditable content={content}>
        <div className={containerClasses} ref={refIntersectionObserver}>
          <SVG src={src}
               style={{
                 color:content.fit_in_color || 'blue'
               }}
               id={props._uid}
               onLoad={afterSvgLoaded}
               className="lm-svg-img"/>
        </div>
      </SbEditable>
    )
  }


  useEffect(() => {
    if (!intersectionElement) {
      return // don't proceed
    }
    const elementDimensions = intersectionElement.boundingClientRect
    const isSvgImage = content.source.endsWith('.svg')
    if (isSvgImage) {

      console.log(isSvgImage, content.fit_in_color)
    }

    if (inView) {
      // small preview
      // setImageProps({
      //   src: getSmallSource(content, {width: 42, height: 42}),
      //   style: {
      //     width: '100%',
      //     maxHeight: elementDimensions.height + 'px'
      //   }
      // })

      let imgDimensions = {width: elementDimensions.width, height: elementDimensions.height}
      const imgSource = getSource(content, imgDimensions)
      fetchImageSource(imgSource)
        .then(() => {
          setImageProps({
            src: imgSource,
            style: {
              width: content.width ? `${content.width}px` : 'auto',
              maxHeight: 'inherit',
              height: content.height ? content.height : 'auto',
              filter: 'blur(0)'
            }
          })
        })
    }
  }, [width, height, inView, content.source])

  const currentProps = {
    ...imageProps,
    alt: content.alt || 'website image',
    className
  }

  return (
    <SbEditable content={content}>
      <div className={containerClasses} ref={refIntersectionObserver}>
        <img {...currentProps}/>
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(Image)
