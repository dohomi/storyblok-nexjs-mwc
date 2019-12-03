import SbEditable from 'storyblok-react'
import React, { FunctionComponent, useMemo } from 'react'
import { HtmlStoryblok } from '../../typings/generated/components-schema'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

const Html: FunctionComponent<{ content: HtmlStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  const htmlContent = useMemo<string>(
    () => {
      if (content.lazy_load) {
        if (inView) {
          return content.body || ''
        } else {
          return ''
        }
      } else {
        return content.body || ''
      }
    },
    [inView, content.lazy_load]
  )

  return (
    <SbEditable content={content}>
      <div dangerouslySetInnerHTML={{
        __html: htmlContent
      }} ref={refIntersectionObserver} />
    </SbEditable>
  )
}

export default Html
