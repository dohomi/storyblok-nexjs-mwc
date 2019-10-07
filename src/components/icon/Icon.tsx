import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { IconStoryblok } from '../../typings/generated/components-schema'

import '../../assets/scss/Layout.scss'

const IconMwc: FunctionComponent<{ content: IconStoryblok }> = ({ content }) => {
  const iconName = content.name && content.name.name
  const iconClasses = clsx(
    'material-icons',
    'rmwc-icon',
    { ['rmwc-icon--size-' + content.size]: !!content.size }
  )
  const containerClasses = clsx(content.class_names && content.class_names.values)

  return (
    <SbEditable content={content}>
      <div className={containerClasses}>
        <i className={iconClasses}>{iconName}</i>
      </div>
    </SbEditable>
  )
}

export default IconMwc
