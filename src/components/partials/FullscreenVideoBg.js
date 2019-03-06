import clsx from 'clsx'
import {useInView} from 'react-intersection-observer'

const FullscreenVideoBg = (content) => {
  const sectionClassNames = clsx('lm-video-background', content.class_names)
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true // for inView only once..
  })
  let src
  if (content.youtube) {
    src = `https://www.youtube.com/embed/${content.youtube}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1`
  } else if (content.vimeo) {
    src = `https://player.vimeo.com/video/${content.vimeo}?background=1&autoplay=1&loop=1&byline=0&title=0`
  }
  console.log(inView)

  return (
    <div className={sectionClassNames} ref={ref}>
      <div className="lm-video-foreground">
        <iframe src={src}
                allowFullScreen={true}
                mozallowfullscreen="true"
                msallowfullscreen="true"
                oallowfullscreen="true"
                webkitallowfullscreen="true"
                frameBorder="0"></iframe>
      </div>
    </div>
  )
}

export default FullscreenVideoBg
