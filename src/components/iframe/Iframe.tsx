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

  useEffect(
    () => {
      if (inView) {
        const current = iframeRef.current
        current && (current.src = content.url as string)
      }
    },
    [inView, content.url]
  )

  let allow = ''
  if (Array.isArray(allowed) && allowed.length) {
    allow = allowed.join(' ')
  }
  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <iframe allow={allow}
                aria-hidden={true}
                frameBorder={0}
                allowFullScreen={properties.includes('allow_fullscreen') || false}
                height={content.height || '100%'}
                name={content.name || ''}
                width={content.width || '100%'}
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
