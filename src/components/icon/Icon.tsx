import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { IconStoryblok } from '../../typings/generated/components-schema'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  icon: {
    '&.xmall': {
      fontSize: '1rem'
    },
    '&.small': {
      fontSize: '1.25rem'
    },
    '&.medium': {
      fontSize: '1.5rem'
    },
    '&.large': {
      fontSize: '2.25rem'
    },
    '&.xlarge': {
      fontSize: '2.5rem'
    },
    '&.xxlarge': {
      fontSize: '3rem'
    },
    '&.xxxlarge': {
      fontSize: '4rem'
    }
  }
})
// "xmall":'',
// "xlarge" | "xxlarge" | "xxxlarge"

const IconMwc: FunctionComponent<{ content: IconStoryblok }> = ({ content }) => {
  const classes = useStyles()
  // size of Icon does not work because icons of material overwrite the sizes
  const iconCustomColor = content.color && content.color.rgba
  return (
    <SbEditable content={content}>
      <div className={clsx(content.class_names && content.class_names.values)}>
        <Icon className={clsx(classes.icon, { [content.size as string]: !!content.size })}
              style={{ color: iconCustomColor ? iconCustomColor : undefined }}>
          {content.name && content.name.name}
        </Icon>
      </div>
    </SbEditable>
  )
}

export default IconMwc
