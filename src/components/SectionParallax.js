import Components from 'components/index'
import SbEditable from 'storyblok-react'
import {ParallaxBanner} from 'react-scroll-parallax'
import clsx from 'clsx'
import withWindowDimensions from './provider/WithWindowDimensions'
import {useEffect, useState} from 'react'
import {useInView} from 'react-intersection-observer'
import {imageServiceNoWebp} from '../utils/ImageService'

/**
 *
 * @param backgroundImage
 * @param height
 * @return {*}
 */
const getImgSource = (backgroundImage, {width, height}) => {
  let path = `${width}x${height}/smart`
  return imageServiceNoWebp(backgroundImage, path)
}

const SectionParallax = ({content, dimensions}) => {
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true
  })
  const [layers, setLayers] = useState([])
  const width = dimensions.width
  const height = dimensions.height
  const elements = content.elements || []
  const contentHeight = content.height

  useEffect(() => {
    if (inView) {
      setLayers(elements.map(item => {
          const containerHeight = height * Number('0.' + contentHeight)
          const offset = ((containerHeight * item.amount) * 2)
          const imgHeight = containerHeight + offset
          let imgSource = getImgSource(item.image, {width, height: parseInt(imgHeight)})
          return {
            image: imgSource,
            amount: Number(item.amount),
            children: item.children && item.children.length && Components(item.children[0])
          }
        })
      )
    }
  }, [inView, width, height])
  const contentClasses = clsx(
    'parallax__content',
    content.class_names && content.class_names.values, {}
  )
  return (
    <SbEditable content={content}>
      <div className="lm-content-section__parallax" ref={refIntersectionObserver}>
        <ParallaxBanner disabled={false}
                        style={{
                          minHeight: contentHeight ? `${contentHeight}vh` : '50vh',
                          height: '100%'
                        }}
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
