import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FlexRowStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'

export type LmFlexRowProps = { content: FlexRowStoryblok }

export function LmFlexRow({ content }: LmFlexRowProps): JSX.Element {
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <Grid container
            direction={content.column ? 'column' : 'row'}
            justify={content.justify ? content.justify : undefined}
            alignItems={content.align_items ? content.align_items : undefined}
            alignContent={content.align_content ? content.align_content : undefined}
            className={clsx(content.class_names && content.class_names.values, {
              'mh-100': content.full_height
            })}
      >
        {body.map(item => Components(item))}
      </Grid>
    </SbEditable>
  )
}
