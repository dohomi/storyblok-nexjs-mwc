import React, { FunctionComponent } from 'react'
import { MotionStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
// import Fade, { FadeProps } from '@material-ui/core/Fade'
import { IntersectionOptions, useInView } from 'react-intersection-observer'
import Slide, { SlideProps } from '@material-ui/core/Slide'
import Fade, { FadeProps } from '@material-ui/core/Fade'
import Grow, { GrowProps } from '@material-ui/core/Grow'
import Zoom, { ZoomProps } from '@material-ui/core/Zoom'
import { Collapse, CollapseProps } from '@material-ui/core'
import SbEditable from 'storyblok-react'

const Motion: FunctionComponent<{ content: MotionStoryblok }> = ({ content }) => {
  // console.log(content)
  const type = content.type || 'collapse'
  const options: IntersectionOptions = {
    triggerOnce: true
  }
  if (content.threshold) {
    options.threshold = Number((content.threshold / 100).toFixed(2))
  }
  const [viewRef, inView] = useInView(options)

  const transitionProps: FadeProps | SlideProps | ZoomProps | GrowProps = {}
  if (content.duration) {
    transitionProps.timeout = content.duration
  }

  return (
    <SbEditable content={content}>
      <div ref={viewRef}>
        {{
          'slide': (
            <Slide in={inView} {...transitionProps as SlideProps} direction={content.slide_direction || 'down'}>
              <div>
                {(content.body || []).map((blok) => Components(blok))}
              </div>
            </Slide>
          ),
          'fade': (
            <Fade in={inView} {...transitionProps as FadeProps}>
              <div>
                {(content.body || []).map((blok) => Components(blok))}
              </div>
            </Fade>
          ),
          'grow': (
            <Grow in={inView} {...transitionProps as GrowProps}>
              <div>
                {(content.body || []).map((blok) => Components(blok))}
              </div>
            </Grow>
          ),
          'zoom': (
            <Zoom in={inView} {...transitionProps as ZoomProps}>
              <div>
                {(content.body || []).map((blok) => Components(blok))}
              </div>
            </Zoom>
          ),
          'collapse': (
            <Collapse in={inView} {...transitionProps as CollapseProps}>
              <div>
                {(content.body || []).map((blok) => Components(blok))}
              </div>
            </Collapse>
          )
        }[type]}
      </div>
    </SbEditable>
  )
}

export default Motion
