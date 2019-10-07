import SbEditable from 'storyblok-react'
import { useInView } from 'react-intersection-observer'
import React, { FunctionComponent, RefObject, useEffect } from 'react'
import { IframeStoryblok } from '../../typings/generated/components-schema'

const Iframe: FunctionComponent<{ content: IframeStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px 800px 0px'
  })
  const iframeRef: RefObject<HTMLIFrameElement> = React.createRef()
  const properties = content.property || []
  const allowed = content.allow || []
  const iframeProps = {
    frameBorder: '0',
    src: '',
    // target: '_parent',
    allowFullScreen: properties.includes('allow_fullscreen') || false,
    height: content.height || '100%',
    name: content.name || '',
    width: content.width || '100%',
    // onLoad: content.onLoad || noop,
    // onMouseOver: content.onMouseOver || noop,
    // onMouseOut: this.props.onMouseOut || noop
    allow: undefined
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
        <iframe {...iframeProps}
                aria-hidden={true}
                ref={iframeRef}
                style={{
                  position: content.position || 'relative',
                  display: content.display || 'block',
                  height: content.height || '100%',
                  width: content.width || '100%'
                }} />
      </div>
    </SbEditable>
  )
}

export default Iframe
