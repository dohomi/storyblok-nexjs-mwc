import Components from 'components'
import SbEditable from 'storyblok-react'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { CSSProperties, FunctionComponent, useEffect, useState } from 'react'
import { useWindowDimensions } from '../provider/WindowDimensionsProvider'
import { SectionVideoBgStoryblok } from '../../typings/generated/components-schema'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

const FullscreenVideoBg = dynamic(
  () => import('./FullscreenVideoBg'),
  { ssr: false }
)

const SectionVideoBg: FunctionComponent<{ content: SectionVideoBgStoryblok }> = ({ content }) => {
  const dimensions = useWindowDimensions()
  const [intersectionRef, inView, intersectionElement] = useInView(intersectionDefaultOptions)
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  })
  const hasSrc = !!content.url
  const body = content.body || []
  const hasBody = !!body.length
  let fixedToRatio = !content.height // enable fixed ratio if height is not set (!hasBody)

  let ratioHeight = 9
  let ratioWidth = 16
  if (content.video_ratio) {
    const ratio = content.video_ratio.split('x')
    ratioWidth = parseInt(ratio[0])
    ratioHeight = parseInt(ratio[1])
  }

  const containerStyle: CSSProperties = {}
  if (content.height) {
    containerStyle.minHeight = `${content.height}vh`
  }

  useEffect(
    () => {
      if (inView) {
        if (!fixedToRatio && intersectionElement) {
          const current = intersectionElement.target
          setContainerDimensions({
            width: current.clientWidth,
            height: current.clientHeight
          })
        }
      }
    },
    [inView, dimensions.width, dimensions.height, content.url, fixedToRatio]
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
                             ratioWidth={ratioWidth} />
        )}
        {hasBody && body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default SectionVideoBg
