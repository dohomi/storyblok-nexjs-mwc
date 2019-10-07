import SbEditable from 'storyblok-react'
import Markdown from './partials/Markdown'
import clsx from 'clsx'

const Paragraph = ({content}) => {
  const typography = content.typography || 'body1'
  const styleClasses = clsx('mdc-typography lm-markup', {
    [`mdc-typography--${typography}`]: true
  }, content.style, content.class_names && content.class_names.values)
  const props = {
    content: content.text,
    className: styleClasses
  }
  if (content.font) {
    props.style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }

  return (
    <SbEditable content={content}>
      <Markdown {...props}/>
    </SbEditable>
  )
}

export default Paragraph
