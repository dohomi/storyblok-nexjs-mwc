import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { RichTextEditorStoryblok } from '../../typings/generated/components-schema'
import RteContentRender from './rte/RteContentRender'
import Typography from '@material-ui/core/Typography'
import { mapTypographyVariant } from '../../utils/muiMapProps'

const RichTextParagraph: FunctionComponent<{ content: RichTextEditorStoryblok }> = ({ content }) => {
  return (
    <SbEditable content={content}>
      <Typography
        className={clsx('lm-markup', content.style, content.class_names && content.class_names.values, {
          [`lm-font-${content.font}`]: content.font
        })}
        component="div"
        variant={mapTypographyVariant[content.typography ? content.typography as string : 'body1']}>
        {content.body && content.body.content.map((blok: any, i: number) => RteContentRender(blok, i))}
      </Typography>
    </SbEditable>
  )
}

export default RichTextParagraph
