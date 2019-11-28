import SbEditable from 'storyblok-react'
import { useInView } from 'react-intersection-observer'
import React, { FunctionComponent } from 'react'
import { IframeStoryblok } from '../../typings/generated/components-schema'
import clsx from 'clsx'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

const Iframe: FunctionComponent<{ content: IframeStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)

  const properties = content.property || []
  const allowed = content.allow || []
  content.responsive_ratio



  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver} className={clsx({
        'embed-responsive': !!content.responsive_ratio,
        [`embed-responsive-${content.responsive_ratio}`]: !!content.responsive_ratio
      })}>
        {!inView && <div className={clsx({ 'embed-responsive-item': !!content.responsive_ratio })} />}
        {inView && <iframe allow={allowed.join(' ')}
                           src={content.url}
                           aria-hidden={true}
                           frameBorder={0}
                           className={clsx({ 'embed-responsive-item': !!content.responsive_ratio })}
                           allowFullScreen={properties.includes('allow_fullscreen') || false}
                           height={content.height || '100%'}
                           name={content.name || ''}
                           width={content.width || '100%'}
                           style={{
                             position: content.position,
                             display: content.display,
                             height: content.height || '100%',
                             width: content.width || '100%'
                           }} />}

      </div>
    </SbEditable>
  )
}

export default Iframe
