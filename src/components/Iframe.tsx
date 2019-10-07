import SbEditable from 'storyblok-react'
import {useInView} from 'react-intersection-observer'
import React, {useEffect} from 'react'

const Iframe = ({content}) => {
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 800px 0px'
  })
  const iframeRef = React.createRef()
  const properties = content.property || []
  const allowed = content.allow || []
  const iframeProps = {
    ref: iframeRef,
    frameBorder: '0',
    src: '',
    target: '_parent',
    allowFullScreen: properties.includes('allow_fullscreen') || false,
    style: Object.assign(
      {},
      {
        position: content.position || 'relative',
        display: content.display || 'block',
        height: content.height || '100%',
        width: content.width || '100%'
      }
    ),
    height: content.height || '100%',
    name: content.name || '',
    width: content.width || '100%'
    // onLoad: content.onLoad || noop,
    // onMouseOver: content.onMouseOver || noop,
    // onMouseOut: this.props.onMouseOut || noop
  }

  if (allowed.length) {
    iframeProps.allow = allowed.join(' ')
  }

  useEffect(
    () => {
      if (inView) {
        iframeRef.current.src = content.url
      }
    },
    [inView, content.url]
  )

  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <iframe {...iframeProps} aria-hidden={true}/>
      </div>
    </SbEditable>
  )
}

export default Iframe
