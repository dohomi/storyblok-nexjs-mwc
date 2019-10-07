import SbEditable from 'storyblok-react'
import { FunctionComponent } from 'react'
import { HtmlStoryblok } from '../../typings/generated/components-schema'

const Html: FunctionComponent<{ content: HtmlStoryblok }> = ({ content }) => {
  const innerHtml = {
    __html: content.body
  }

  return (
    <SbEditable content={content}>
      <div dangerouslySetInnerHTML={innerHtml}></div>
    </SbEditable>
  )
}

export default Html
