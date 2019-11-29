import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { IconStoryblok } from '../../typings/generated/components-schema'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import LmIcon from './LmIcon'

const useStyles = makeStyles({
  icon: {
    fill: 'currentColor',

    '&.mdi::before': {
      verticalAlign: 'top'
    },
    '&.xmall': {
      fontSize: '1rem',
      height: '1rem',
      width: '1rem'
    },
    '&.small': {
      fontSize: '1.25rem',
      height: '1.25rem',
      width: '1.25rem'
    },
    '&.medium': {
      fontSize: '1.5rem',
      height: '1.5rem',
      width: '1.5rem'
    },
    '&.large': {
      fontSize: '2.25rem',
      height: '2.25rem',
      width: '2.25rem'
    },
    '&.xlarge': {
      fontSize: '2.5rem',
      height: '2.5rem',
      width: '2.5rem'
    },
    '&.xxlarge': {
      fontSize: '3rem',
      height: '3rem',
      width: '3rem'
    },
    '&.xxxlarge': {
      fontSize: '4rem',
      height: '4rem',
      width: '4rem'
    }
  }
})
// "xmall":'',
// "xlarge" | "xxlarge" | "xxxlarge"

const underscoreToMinus = (str: string) => str.replace(/_/g, '-')

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
        <LmIcon
          className={clsx(classes.icon, {
            [content.size as string]: !!content.size
          })}
          style={{ color: iconCustomColor ? iconCustomColor : undefined }}
          iconName={content.name && content.name.name}
        />
        <Icon
          className={clsx(classes.icon, { [content.size as string]: !!content.size }, `mdi mdi-${content.name && content.name.name && underscoreToMinus(content.name.name)}`)} />
      </div>
    </SbEditable>
  )
}

export default IconMwc
