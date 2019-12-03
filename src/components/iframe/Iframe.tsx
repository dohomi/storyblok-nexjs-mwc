import SbEditable from 'storyblok-react'
import { useInView } from 'react-intersection-observer'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { IframeStoryblok } from '../../typings/generated/components-schema'
import clsx from 'clsx'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'
import Skeleton from '@material-ui/lab/Skeleton'

const Iframe: FunctionComponent<{ content: IframeStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  const [loaded, setLoaded] = useState<boolean>(false)
  const urlSrc = useMemo(
    () => {
      if (inView) {
        return content.url
      }
      return ''
    },
    [inView]
  )
  const properties = content.property || []
  const allowed = content.allow || []
  content.responsive_ratio


  return (
    <SbEditable content={content}>
      <div ref={refIntersectionObserver} className={clsx({
        'embed-responsive': !!content.responsive_ratio,
        [`embed-responsive-${content.responsive_ratio}`]: !!content.responsive_ratio
      })}>
        {!loaded && <Skeleton style={{ position: 'absolute' }} width={'100%'} height={'100%'} />}
        <iframe allow={allowed.join(' ')}
                src={urlSrc}
                aria-hidden={true}
                frameBorder={0}
                onLoad={() => setLoaded(true)}
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
                }} />

      </div>
    </SbEditable>
  )
}

export default Iframe
