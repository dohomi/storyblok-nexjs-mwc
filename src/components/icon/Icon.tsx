import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { IconStoryblok } from '../../typings/generated/components-schema'

const IconMwc: FunctionComponent<{ content: IconStoryblok }> = ({ content }) => {
  const iconName = content.name && content.name.name
  return (
    <SbEditable content={content}>
      <div className={clsx(content.class_names && content.class_names.values)}>
        <i
          className={clsx('material-icons', 'rmwc-icon', { ['rmwc-icon--size-' + content.size]: !!content.size })}>
          {iconName}
        </i>
      </div>
    </SbEditable>
  )
}

export default IconMwc
