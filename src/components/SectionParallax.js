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
  const [refIntersectionObserver, inView, refElement] = useInView({
    triggerOnce: true
  })
  let containerEl
  const width = dimensions.width
  const height = dimensions.height
  const elements = content.elements || []
  const contentHeight = content.height
  const [layers, setLayers] = useState([])
  const disableLazyLoad = content.disable_lazy_load
  const styles = {
    minHeight: contentHeight ? `${contentHeight}vh` : '50vh',
    height: '100%'
  }
  const contentClasses = clsx(
    'parallax__content',
    content.class_names && content.class_names.values, {}
  )
  // let [styles, setStyles] = useState(styles)

  useEffect(
    () => {
      if (disableLazyLoad) {
        processLayers(containerEl)
      } else if (inView) {
        processLayers(refElement.target)
      }
    },
    [inView, width, height]
  )

  function processLayers (el) {
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

    setLayers(items)
    Promise.all(elements.map(item => {
      const src = item.image
      return fetchImageSource(src)
    }))
      .then(() => {
        el.classList.add('loaded')
      })
  }

  function setRef (ref) {
    refIntersectionObserver(ref)
    containerEl = ref
  }

  return (
    <SbEditable content={content}>
      <div className="lm-content-section__parallax" ref={setRef}>
        <ParallaxBanner disabled={false}
                        style={styles}
                        className=""
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
