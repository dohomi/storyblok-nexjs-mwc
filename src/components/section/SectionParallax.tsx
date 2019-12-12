import Components from '@components'
import SbEditable from 'storyblok-react'
import { ParallaxBanner } from 'react-scroll-parallax'
import clsx from 'clsx'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getImageAttrs } from '../../utils/ImageService'
import { getImagePromise } from '../../utils/fetchImageHelper'
import { SectionParallaxStoryblok } from '../../typings/generated/components-schema'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { BannerLayer } from 'react-scroll-parallax/cjs'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles({
  parallax: {
    '& .parallax-inner': {
      zIndex: 0
    },
    '& .parallax__content': {
      zIndex: 1,
      position: 'relative',
      height: '100%'
    }
  }
})

const SectionParallax: FunctionComponent<{ content: SectionParallaxStoryblok }> = ({ content }) => {
  const dimensions = useWindowDimensions()
  const classes = useStyles()
  const [refIntersectionObserver, inView, refElement] = useInView(intersectionDefaultOptions)
  const width = dimensions.width
  const height = dimensions.height
  const elements = content.elements || []
  const contentHeight = content.height
  const [layers, setLayers] = useState<BannerLayer[] | undefined>()
  const disableLazyLoad = content.disable_lazy_load
  const styles = {
    height: contentHeight ? `${contentHeight}vh` : '50vh',
  }

  // let [styles, setStyles] = useState(styles)

  useEffect(
    () => {
      if (disableLazyLoad) {
        processLayers()
      } else if (inView) {
        refElement && processLayers()
      }
    },
    [inView, width, height]
  )

  function processLayers() {
    const items = elements.map(async item => {
      const containerHeight = height * Number(contentHeight as number / 100)
      const offset = ((containerHeight * item.amount) * 2)
      const imgHeight = containerHeight + offset

      const img = getImageAttrs({
        originalSource: item.image,
        width: width,
        height: ~~imgHeight,
        smart: true,
        focalPoint: item.image_focal_point
      })
      const imgSource = await getImagePromise({ src: img.src, srcSet: img.srcSet })
      return {
        image: `"${imgSource}"`,
        amount: Number(item.amount),
        children: item.children && item.children.length && Components(item.children[0])
      }
    })
    Promise.all(items)
      .then((layers) => {
        setLayers(layers as any)
      })
  }


  const body = content.body || []
  return (
    <SbEditable content={content}>
      <div className={classes.parallax}
           style={styles}
           ref={refIntersectionObserver}>
        <ParallaxBanner disabled={false}
                        style={styles}
                        layers={layers || []}>
          {!layers && <Skeleton style={{ position: 'absolute' }} width={'100%'} height={'100%'} variant="rect" />}
          <div className={clsx('parallax__content', content.class_names && content.class_names.values)}>
            {body.map((blok) => Components(blok))}
          </div>
        </ParallaxBanner>
      </div>
    </SbEditable>
  )
}

export default SectionParallax
