import SbEditable from 'storyblok-react'
import Markdown from './partials/Markdown'
import clsx from 'clsx'
import {memo} from 'react'

const Paragraph = (props) => {
  const content = props.content
  const typography = content.typography || 'body1'
  const styleClasses = clsx({
    'mdc-typography': true,
    [`mdc-typography--${typography}`]: true
  }, content.style, content.class_names && content.class_names.values)
  return (
    <SbEditable content={content}>
      <Markdown content={content.text} className={styleClasses}/>
    </SbEditable>
  )
}

export default memo(Paragraph)
