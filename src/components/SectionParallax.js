import Components from 'components/index'
import SbEditable from 'storyblok-react'
import {ParallaxBanner} from 'react-scroll-parallax'
import clsx from 'clsx'
import withWindowDimensions from './provider/WithWindowDimensions'
import {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import imageService, {getFocalPoint} from '../utils/ImageService'
import {fetchImageSource} from '../utils/fetchImageHelper'

/**
 *
 * @param backgroundImage
 * @param height
 * @return {*}
 */
const getImgSource = (backgroundImage, {width, height, focalPoint}) => {
  let path = `${width}x${height}`
  let focal = ''
  if (!focalPoint) {
    path += '/smart'
  } else {
    focal = getFocalPoint(backgroundImage, focalPoint)
  }

  return imageService(backgroundImage, path, focal)
}

const SectionParallax = ({content, dimensions}) => {
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  const width = dimensions.width
  const height = dimensions.height
  const elements = content.elements || []
  const contentHeight = content.height
  const [layers, setLayers] = useState([])
  const disableLazyLoad = content.disable_lazy_load
  let [styles, setStyles] = useState({
    minHeight: contentHeight ? `${contentHeight}vh` : '50vh',
    height: '100%'
  })

  useEffect(
    () => {
      if (disableLazyLoad) {
        processLayers()
      } else if (inView) {
        processLayers()
      }
    },
    [inView, width, height]
  )

  function processLayers () {
    const items = elements.map(item => {
      const containerHeight = height * Number(contentHeight / 100)
      const offset = ((containerHeight * item.amount) * 2)
      const imgHeight = containerHeight + offset
      let imgSource = getImgSource(
        item.image,
        {
          width,
          height: parseInt(imgHeight),
          focalPoint: item.image_focal_point
        }
      )
      return {
        image: `"${imgSource}"`,
        amount: Number(item.amount),
        children: item.children && item.children.length && Components(item.children[0])
      }
    })
    Promise.all(elements.map(item => {
      const src = item.image
      return fetchImageSource(src)
    }))
      .then(() => {
        setLayers(items)
        setStyles({
          ...styles,
          filter: 'blur(0)'
        })
      })
  }

  const contentClasses = clsx(
    'parallax__content',
    content.class_names && content.class_names.values, {}
  )
  return (
    <SbEditable content={content}>
      <div className="lm-content-section__parallax" ref={refIntersectionObserver}>
        <ParallaxBanner disabled={false}
                        style={styles}
                        className="progressive-img-container"
                        layers={layers}>
          <div className={contentClasses}>
            {content.body.map((blok) => Components(blok))}
          </div>
        </ParallaxBanner>
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(SectionParallax)
