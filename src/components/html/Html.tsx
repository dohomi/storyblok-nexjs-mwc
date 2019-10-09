import SbEditable from 'storyblok-react'
import { FunctionComponent } from 'react'
import { HtmlStoryblok } from '../../typings/generated/components-schema'

const Html: FunctionComponent<{ content: HtmlStoryblok }> = ({ content }) => {
  return (
    <SbEditable content={content}>
      <div dangerouslySetInnerHTML={{ __html: content.body as string }} />
    </SbEditable>
  )
}

export default Html
