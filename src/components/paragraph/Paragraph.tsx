import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ParagraphStoryblok } from '../../typings/generated/components-schema'
import parseMarkdownContent from './markdown-helper'
import RteContentRender from './rte/RteContentRender'

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

  if (content.rte && content.rte.content) {
    console.log(JSON.stringify(content.rte.content))
    return (
      <SbEditable content={content}>
        <div className={styleClasses}
             style={style}>
          {content.rte.content.map((blok: any, i: number) => RteContentRender(blok, i))}
        </div>
      </SbEditable>
    )
  }

  return (
    <SbEditable content={content}>
      <div className={styleClasses}
           style={style}
           dangerouslySetInnerHTML={{
             __html: parseMarkdownContent(content.text as string)
           }}
      />
    </SbEditable>
  )
}

export default Paragraph
