import clsx from 'clsx'
import YouTube from 'react-youtube'

const FullscreenVideoBg = (content) => {
  const sectionClassNames = clsx('lm-video-background', content.class_names)

  if (!content.youtube) {
    return (
      <div>please insert youtube ID</div>
    )
  }

  const opts = {
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      loop: 1,
      fs: 0, // fullscreen button
      controls: 0
    }
  }
  return (
    <div className={sectionClassNames}>
      <div className="lm-video-foreground">
        <YouTube videoId={content.youtube}
                 opts={opts}></YouTube>

      </div>
    </div>
  )
}

export default FullscreenVideoBg
