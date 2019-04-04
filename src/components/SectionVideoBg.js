import Components from 'components/index'
import SbEditable from 'storyblok-react'
import dynamic from 'next/dynamic'
import {useInView} from 'react-intersection-observer'
import {useEffect, useState} from 'react'
import withWindowDimensions from './provider/WithWindowDimensions'

const FullscreenVideoBg = dynamic(
  () => import('./partials/FullscreenVideoBg'),
  {ssr: false}
)

const SectionVideoBg = ({content, dimensions}) => {
  const hasSrc = !!content.url
  const body = content.body || []
  const hasBody = !!body.length
  let fixedToRatio = !hasBody && !content.height
  const [containerDimensions, setContainerDimensions] = useState({})
  const [intersectionRef, inView, intersectionElement] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })

  let ratioHeight = 9
  let ratioWidth = 16
  if (content.video_ratio) {
    const ratio = content.video_ratio.split('x')
    ratioWidth = parseInt(ratio[0])
    ratioHeight = parseInt(ratio[1])
  }

  const containerStyle = {}
  if (content.height) {
    containerStyle.minHeight = `${content.height}vh`
  }

  useEffect(
    () => {
      if (inView) {
        if (!fixedToRatio) {
          const current = intersectionElement.target
          setContainerDimensions({
            width: current.clientWidth,
            height: current.clientHeight
          })
        }
      }
    },
    [inView, dimensions.width, dimensions.height, content.url]
  )


  return (
    <SbEditable content={content}>
      <div className="lm-content-section lm-video-section"
           style={containerStyle}
           ref={intersectionRef}>
        {hasSrc && inView && (
          <FullscreenVideoBg {...content}
                             containerDimensions={containerDimensions}
                             fixedToRatio={fixedToRatio}
                             ratioHeight={ratioHeight}
                             ratioWidth={ratioWidth}/>
        )}
        {hasBody && body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default withWindowDimensions(dimensions => ({dimensions}))(SectionVideoBg)
