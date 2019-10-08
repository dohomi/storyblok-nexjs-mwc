import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import Markdown from './Markdown'
import { FunctionComponent } from 'react'
import { ParagraphStoryblok } from '../../typings/generated/components-schema'

const Paragraph: FunctionComponent<{ content: ParagraphStoryblok }> = ({ content }) => {
  const typography = content.typography || 'body1'
  const styleClasses = clsx('mdc-typography lm-markup', {
    [`mdc-typography--${typography}`]: true
  }, content.style, content.class_names && content.class_names.values)
  const props = {
    content: content.text,
    className: styleClasses,
    style: undefined
  }
  if (content.font) {
    props.style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }

  return (
    <SbEditable content={content}>
      <Markdown {...props} />
    </SbEditable>
  )
}

export default Paragraph
