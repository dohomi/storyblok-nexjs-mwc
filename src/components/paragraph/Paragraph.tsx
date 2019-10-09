import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import Markdown from './Markdown'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ParagraphStoryblok } from '../../typings/generated/components-schema'

const Paragraph: FunctionComponent<{ content: ParagraphStoryblok }> = ({ content }) => {
  const typography = content.typography || 'body1'
  const styleClasses = clsx('mdc-typography lm-markup', {
    [`mdc-typography--${typography}`]: true
  }, content.style, content.class_names && content.class_names.values)

  let style = {}
  if (content.font) {
    style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }

  return (
    <SbEditable content={content}>
      <Markdown
        content={content.text as string}
        className={styleClasses}
        style={style}
      />
    </SbEditable>
  )
}

export default Paragraph
