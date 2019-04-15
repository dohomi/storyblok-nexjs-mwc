import Components from 'components/index'
import SbEditable from 'storyblok-react'
import {ParallaxBanner} from 'react-scroll-parallax'
import clsx from 'clsx'
import withWindowDimensions from './provider/WithWindowDimensions'
import {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import {getImageAttrs} from '../utils/ImageService'
import {getImagePromise} from '../utils/fetchImageHelper'


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
    const items = elements.map(async item => {
      const containerHeight = height * Number(contentHeight / 100)
      const offset = ((containerHeight * item.amount) * 2)
      const imgHeight = containerHeight + offset

      const img = getImageAttrs({
        originalSource: item.image,
        width,
        height: parseInt(imgHeight),
        smart: true,
        focalPoint: item.image_focal_point
      })
      const imgSource = await getImagePromise({src: img.src, srcSet: img.srcSet})
      return {
        image: `"${imgSource}"`,
        amount: Number(item.amount),
        children: item.children && item.children.length && Components(item.children[0])
      }
    })
    Promise.all(items)
      .then((layers) => {
        setLayers(layers)
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
