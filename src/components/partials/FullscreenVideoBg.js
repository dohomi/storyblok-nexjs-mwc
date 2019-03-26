import clsx from 'clsx'
import ReactPlayer from 'react-player'


// <YouTube videoId={content.youtube}
// opts={opts}></YouTube>

const FullscreenVideoBg = (content) => {
  const sectionClassNames = clsx('lm-video-background', content.class_names)
  const properties = content.property || []
  if (!content.url) {
    return (
      <div>please insert a video URL</div>
    )
  }

  const playerProps = {
    loop: properties.includes('loop'),
    playing: properties.includes('autoplay'),
    muted: properties.includes('muted'),
    controls: properties.includes('controls')
  }

  console.log(playerProps, content.url)
  return (
      <ReactPlayer url={content.url}
                     className="react-player"
                     width="100%"
                     height="100%"
                     {...playerProps}/>
  )
}

export default FullscreenVideoBg
