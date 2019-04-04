import clsx from 'clsx'
import ReactPlayer from 'react-player'
import BackgroundImageContainer from './BackgroundImageContainer'
import {useState} from 'react'

const FullscreenVideoBg = (content) => {
  const properties = content.property || []
  const videoAspect = content.ratioHeight / content.ratioWidth
  let fixedToRatio = content.fixedToRatio
  const [error, setError] = useState(false)
  const className = clsx('react-player')
  if (!content.url) {
    return (
      <div>please insert a video URL</div>
    )
  }

  const playerProps = {
    loop: properties.includes('loop'),
    playing: properties.includes('autoplay'),
    muted: properties.includes('muted'),
    controls: properties.includes('controls'),
    onError: () => setError(true)
  }

  // render video based on video ratio
  if (fixedToRatio) {
    return (
      <div style={{paddingBottom: `${(videoAspect * 100).toFixed(2)}%`, position: 'relative', width: '100%'}}>
        <ReactPlayer url={content.url}
                     className={className}
                     width="100%"
                     height="100%"
                     {...playerProps}/>
      </div>
    )
  }

  // calculate video container to fit into available space
  const windowWidth = content.containerDimensions.width
  const windowHeight = content.containerDimensions.height
  const windowAspect = windowHeight / windowWidth
  let vidBgWidth = '100%'
  if (windowAspect > videoAspect) {
    vidBgWidth = (windowAspect / videoAspect * 100).toFixed(2) + '%'
  }

  // cover the available space
  return (
    <>
      <div className={`videobg-width${properties.includes('suppress_mouse_events') ? ' video-no-mouse' : ''}`}
           style={{width: vidBgWidth}}>
        <div className="videobg-aspect"
             style={{paddingBottom: `${(videoAspect * 100).toFixed(2)}%`}}>
          <div className="videobg-make-height">
            <ReactPlayer url={content.url}
                         className={className}
                         width="100%"
                         height="100%"
                         {...playerProps}/>
          </div>
        </div>
      </div>
      {error && content.fallback_image && <BackgroundImageContainer image={content.fallback_image}/>}
    </>
  )
}

export default FullscreenVideoBg
