import Components from 'components/index'
import SbEditable from 'storyblok-react'
import dynamic from 'next/dynamic'


const FullscreenVideoBg = dynamic(
  () => import('./partials/FullscreenVideoBg'),
  {ssr: false}
)

const SectionVideoBg = ({content}) => {
  const hasSrc = !!content.url
  const body = content.body || []
  const hasBody = body.length
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
    delete containerStyle.paddingTop
  } else {
    containerStyle.paddingTop = `${((ratioHeight / ratioWidth) * 100).toFixed(2)}%`
  }
  return (
    <SbEditable content={content}>
      <div className="lm-content-section lm-video-section"
           style={containerStyle}>
        {hasSrc && (
          <FullscreenVideoBg {...content}
                             ratioHeight={ratioHeight}
                             ratioWidth={ratioWidth}/>
        )}
        {hasBody && body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default SectionVideoBg
