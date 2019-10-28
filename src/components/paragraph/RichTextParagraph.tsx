import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { RichTextEditorStoryblok } from '../../typings/generated/components-schema'
import RteContentRender from './rte/RteContentRender'

const RichTextParagraph: FunctionComponent<{ content: RichTextEditorStoryblok }> = ({ content }) => {
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
      <div className={styleClasses}
           style={style}>
        {content.body && content.body.content.map((blok: any, i: number) => RteContentRender(blok, i))}
      </div>
    </SbEditable>
  )
}

export default RichTextParagraph
