import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const SectionVideoBg = ({content}) => {
  const sectionClassNames = clsx('lm-video-background', content.class_names)
  let src
  if (content.youtube) {
    src = `https://www.youtube.com/embed/${content.youtube}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1`
  } else if (content.vimeo) {
    src = `https://player.vimeo.com/video/${content.vimeo}?background=1&autoplay=1&loop=1&byline=0&title=0`
  }
  return (
    <SbEditable content={content}>
      <div className="lm-content-section lm-section__full-height">
        {src && <div className={sectionClassNames}>
          <div className="lm-video-foreground">
            <iframe
              src={src}
              allowFullScreen mozallowfullscreen msallowfullscreen oallowfullscreen webkitallowfullscreen
              frameBorder="0"></iframe>
          </div>
        </div>}
        {content.body.map((blok) => Components(blok))}
      </div>
    </SbEditable>
  )
}

export default SectionVideoBg
