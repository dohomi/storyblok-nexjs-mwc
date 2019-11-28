import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import { HtmlStoryblok } from '../../typings/generated/components-schema'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

const Html: FunctionComponent<{ content: HtmlStoryblok }> = ({ content }) => {
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  return (
    <SbEditable content={content}>
      <div dangerouslySetInnerHTML={{
        __html: content.lazy_load
          ? (inView && content.body as string) || ''
          : content.body as string
      }}
           ref={refIntersectionObserver} />
    </SbEditable>
  )
}

export default Html
