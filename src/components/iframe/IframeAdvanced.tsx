import SbEditable from 'storyblok-react'
import React, { createRef, FunctionComponent, RefObject, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IframeAdvancedStoryblok } from '../../typings/generated/components-schema'

const IframeAdvanced: FunctionComponent<{ content: IframeAdvancedStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView, containerRef] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px 300px 0px'
  })
  const iframeRef: RefObject<HTMLIFrameElement> = createRef()
  const [src, setSrc] = useState<string>('')
  const contentId = `iframe_${content._uid}`
  const properties = content.property || []
  const allowed = content.allow || []
  useEffect(
    () => {
      setSrc(content.url || '')
    },
    [inView]
  )
  useEffect(
    () => {
      const messageFunc = (message: any) => {
        const clientHeight = message && message.data && message.data[content.incoming_message_key || 'stClientHeight']
        const el = containerRef && containerRef.target && containerRef.target.firstChild
        if (clientHeight && el) {
          const iframe = el as HTMLIFrameElement
          iframe.height = clientHeight + 'px'
          iframe.style.height = clientHeight + 'px'
        }
      }
      const clickFunc = () => {
        const el = containerRef && containerRef.target && containerRef.target.firstChild
        if (el) {
          const iframe = el as HTMLIFrameElement
          const contentWindow = iframe.contentWindow
          contentWindow && contentWindow.postMessage(content.post_message_key || '_clickOutside', '*')
        }
      }
      window.addEventListener('message', messageFunc)
      window.addEventListener('click', clickFunc)
      return () => {
        window.removeEventListener('message', messageFunc)
        window.removeEventListener('click', clickFunc)
      }
    },
    [containerRef]
  )

  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <iframe
          ref={iframeRef}
          id={contentId}
          allow={allowed.join(' ')}
          frameBorder={0}
          scrolling="no"
          allowFullScreen={properties.includes('allow_fullscreen') || false}
          src={src}
          className="border-0"
          style={{
            overflowY: 'hidden',
            display: content.display,
            height: content.height || '100%',
            width: content.width || '100%'
          }}
        />
      </div>
    </SbEditable>
  )
}

export default IframeAdvanced

/*

<iframe id="stIDForm" class="md-image" src="https://mysga.studentsgoabroad.com/?id=cj9sfuvq9onal0116182ztkb0" width="100%" style="border:none;overflow-y: hidden;" scrolling="no"></iframe><script>window.addEventListener("message",function(e){const i=e&&e.data&&e.data.stClientHeight;if(i){const e=document.getElementById("stIDForm");e.height=i+60,e.style.height=i+60}},!1),window.document.body.addEventListener("click",function(){const e=document.getElementById("stIDForm");e&&e.contentWindow.postMessage("_clickOutside","*")},!1)</script>

 */
