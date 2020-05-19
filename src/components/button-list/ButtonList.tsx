import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React from 'react'
import { ButtonListStoryblok } from '../../typings/generated/components-schema'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LmButtonListProps = CoreComponentProps & { content: ButtonListStoryblok }

export function LmButtonList({ content, ComponentRender }: LmButtonListProps): JSX.Element {
  const body = content.body || []
  const properties = content.property || []
  const classNames = clsx('d-flex', content.class_names && content.class_names.values, {
    'lm-button-list__margin-left': properties.includes('margin_left')
  })

  return (
    <SbEditable content={content}>
      <div className={classNames}>
        {body.map(blok => <ComponentRender content={blok} />)}
      </div>
    </SbEditable>
  )
}
