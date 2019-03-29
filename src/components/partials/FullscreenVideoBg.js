import clsx from 'clsx'
import ReactPlayer from 'react-player'
import BackgroundImageContainer from './BackgroundImageContainer'
import {useState} from 'react'

const FullscreenVideoBg = (content) => {
  const [error, setError] = useState(false)
  const contentHeight = content.height
  const className = clsx('react-player', {
    [`react-player__${contentHeight ? 'fit-into-ratio' : 'fixed-ratio'}`]: true
  })
  let style = {}
  if (contentHeight) {
    style = {
      width: '100vw',
      minHeight: `${contentHeight}vw`,
      height: `${((content.ratioHeight / content.ratioWidth) * 100).toFixed(2)}vw`, // '56.25   vw',
      minWidth: `${((content.ratioWidth / content.ratioHeight) * 100).toFixed(2)}vw` // '177.77vh'
    }
  }
  let hasError
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
    controls: properties.includes('controls'),
    onError: () => setError(true)
  }

  return (
    <>
      <ReactPlayer url={content.url}
                   style={style}
                   className={className}
                   width="100%"
                   height="100%"
                   {...playerProps}/>
      {error && content.fallback_image && <BackgroundImageContainer image={content.fallback_image}/>}
    </>
  )
}

export default FullscreenVideoBg
