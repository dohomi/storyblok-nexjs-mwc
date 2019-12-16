import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ParagraphStoryblok } from '../../typings/generated/components-schema'
import parseMarkdownContent from './markdown-helper'
import Typography from '@material-ui/core/Typography'
import { mapTypographyVariant } from '../../utils/muiMapProps'
import { useRichTextStyles } from './richTextStyles'

const Paragraph: FunctionComponent<{ content: ParagraphStoryblok }> = ({ content }) => {
  const classes = useRichTextStyles()
  return (
    <SbEditable content={content}>
      <Typography
        className={clsx('lm-markup', classes.richText, content.style, content.class_names && content.class_names.values, {
          [`lm-font-${content.font}`]: content.font
        })}
        variant={mapTypographyVariant[content.typography ? content.typography as string : 'body1']}
        component="div"
        dangerouslySetInnerHTML={{
          __html: parseMarkdownContent(content.text as string)
        }}
      />
    </SbEditable>
  )
}

export default Paragraph
