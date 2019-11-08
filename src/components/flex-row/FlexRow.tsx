import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { FlexRowStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'

const FlexRow: FunctionComponent<{ content: FlexRowStoryblok }> = ({ content }) => {
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <Grid container direction={content.column ? 'column' : 'row'}
            justify={content.justify ? content.justify : undefined}
            style={{
              height: content.full_height ? '100%' : 'auto'
            }}
            alignItems={content.align_items ? content.align_items : undefined}
            className={clsx(content.class_names && content.class_names.values)}
      >
        {body.map(item => Components(item))}
      </Grid>
    </SbEditable>
  )
}

export default FlexRow
