import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { RichTextEditorStoryblok } from '../../typings/generated/components-schema'
import RteContentRender from './rte/RteContentRender'
import Typography from '@material-ui/core/Typography'
import { mapTypographyVariant } from '../../utils/muiMapProps'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => createStyles({
  richText: {
    '& > p': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '&:first-child': {
        marginTop: 0
      },
      '&:last-child': {
        marginBottom: 0
      }
    }
  }
}))

const RichTextParagraph: FunctionComponent<{ content: RichTextEditorStoryblok }> = ({ content }) => {
  const classes = useStyles()
  return (
    <SbEditable content={content}>
      <Typography
        className={clsx('lm-markup', classes.richText, content.style, content.class_names && content.class_names.values, {
          [`lm-font-${content.font}`]: content.font
        })}
        align={content.align ? content.align : undefined}
        color={content.color ? content.color : undefined}
        component="div"
        variant={mapTypographyVariant[content.typography ? content.typography as string : 'body1']}>
        {content.body && content.body.content.map((blok: any, i: number) => RteContentRender(blok, i))}
      </Typography>
    </SbEditable>
  )
}

export default RichTextParagraph
