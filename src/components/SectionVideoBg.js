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
  let paddingTop = '56%'
  if (content.video_ratio) {
    const ratio = content.video_ratio.split('x')
    paddingTop = `${((Math.round(parseInt(ratio[1])) / Math.round(parseInt(ratio[0]))) * 100).toFixed(2)}%`
  }
  return (
    <SbEditable content={content}>
      <div className="lm-content-section lm-video-section"
           style={{
             paddingTop: paddingTop
           }}>
        {hasSrc && (
          <FullscreenVideoBg {...content} />
        )}
        {hasBody && body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default SectionVideoBg
