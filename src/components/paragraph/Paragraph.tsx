import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ParagraphStoryblok } from '../../typings/generated/components-schema'
import parseMarkdownContent from './markdown-helper'
import Typography from '@material-ui/core/Typography'
import { mapTypographyVariant } from '../../utils/muiMapProps'

const Paragraph: FunctionComponent<{ content: ParagraphStoryblok }> = ({ content }) => {
  let style = {}
  if (content.font) {
    style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }

  return (
    <SbEditable content={content}>
      <Typography className={clsx('lm-markup', content.style, content.class_names && content.class_names.values)}
                  variant={mapTypographyVariant[content.typography as string || 'body1']}
                  style={style}
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdownContent(content.text as string)
                  }}
      />
    </SbEditable>
  )
}

export default Paragraph
