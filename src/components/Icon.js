import SbEditable from 'storyblok-react'
import {memo} from 'react'
import clsx from 'clsx'

/**
 * Simplicity for this component: we render icon classNames just as props without rmwc
 *
 * @param content
 * @return {*}
 * @constructor
 */
const IconMwc = ({content}) => {
  const iconName = content.name && content.name.name
  const iconClasses = clsx(
    'material-icons',
    'rmwc-icon',
    {['rmwc-icon--size-' + content.size]: !!content.size}
  )
  const containerClasses = clsx(content.class_names && content.class_names.values)
  // content.size && (iconProps.size = content.size)
  // console.log(iconProps)
  return (
    <SbEditable content={content}>
      <div className={containerClasses}>
        <i className={iconClasses}>{iconName}</i>
      </div>
    </SbEditable>
  )
}

export default memo(IconMwc)
