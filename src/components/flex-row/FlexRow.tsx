import SbEditable from 'storyblok-react'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { FlexRowStoryblok } from '../../typings/generated/components-schema'
import Components from 'components'
import clsx from 'clsx'

const FlexRow: FunctionComponent<{ content: FlexRowStoryblok }> = ({ content }) => {
  const body = content.body || []
  const classes = content.class_names && content.class_names.values
  return (
    <SbEditable content={content}>
      <div className={clsx('d-flex flex-row align-items-center', classes)}>
        {body.map(item => Components(item))}
      </div>
    </SbEditable>
  )
}

export default FlexRow
