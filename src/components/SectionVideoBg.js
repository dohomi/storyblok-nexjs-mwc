import Components from 'components/index'
import SbEditable from 'storyblok-react'
import FullscreenVideoBg from './partials/FullscreenVideoBg'

const SectionVideoBg = ({content}) => {
  const hasSrc = !!(content.youtube || content.vimeo)

  return (
    <SbEditable content={content}>
      <div className="lm-content-section lm-section__full-height">
        {hasSrc && FullscreenVideoBg(content)}
        {content.body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default SectionVideoBg
