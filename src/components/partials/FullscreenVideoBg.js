import clsx from 'clsx'
import ReactPlayer from 'react-player'
import BackgroundImageContainer from './BackgroundImageContainer'
import {useState} from 'react'
import withWindowDimensions from '../provider/WithWindowDimensions'

const FullscreenVideoBg = (content) => {
  const windowWidth = content.dimensions.width
  const windowHeight = content.dimensions.height
  const properties = content.property || []
  const windowAspect = windowHeight / windowWidth
  const videoAspect = content.ratioHeight / content.ratioWidth
  let vidBgWidth = '100%'
  if (windowAspect > videoAspect) {

    vidBgWidth = (windowAspect / videoAspect * 100).toFixed(2) + '%'
  }

  const [error, setError] = useState(false)
  const contentHeight = content.height
  const className = clsx('react-player', {
    [`react-player__${contentHeight ? 'fit-into-ratio' : 'fixed-ratio'}`]: true
  })
  let style = {}
  if (contentHeight) {
    // style = {
    //   width: '100vw',
    //   minHeight: `${contentHeight}vw`,
    //   height: `${((content.ratioHeight / content.ratioWidth) * 100).toFixed(2)}vw`, // '56.25   vw',
    //   minWidth: `${((content.ratioWidth / content.ratioHeight) * 100).toFixed(2)}vw` // '177.77vh'
    // }
  }
  let hasError

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

  return (
    <>
      <div className={`videobg-width${properties.includes('suppress_mouse_events') ? ' video-no-mouse' : ''}`}
           style={{width: vidBgWidth}}>
        <div className="videobg-aspect">
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

export default withWindowDimensions(dimensions => ({dimensions}))(FullscreenVideoBg)
