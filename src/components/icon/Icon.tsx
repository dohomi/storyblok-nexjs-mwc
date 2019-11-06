import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { IconStoryblok } from '../../typings/generated/components-schema'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'

const mapSize = {
  'small': 'small',
  'medium': 'default',
  'large': 'large'
}

const useStyles = makeStyles({
  icon: {
    '&.xmall': {
      fontSize: '1rem'
    },
    '&.xlarge': {
      fontSize: '3rem'
    },
    '&.xxlarge': {
      fontSize: '3.8rem'
    },
    '&.xxxlarge': {
      fontSize: '5rem'
    }
  }
})
// "xmall":'',
// "xlarge" | "xxlarge" | "xxxlarge"

const IconMwc: FunctionComponent<{ content: IconStoryblok }> = ({ content }) => {
  const classes = useStyles()
  return (
    <SbEditable content={content}>
      <div className={clsx(content.class_names && content.class_names.values)}>
        <Icon className={clsx(classes.icon, { [content.size as string]: !!content.size })}
              fontSize={mapSize[content.size as string]}>{content.name && content.name.name}</Icon>
      </div>
    </SbEditable>
  )
}

export default IconMwc
