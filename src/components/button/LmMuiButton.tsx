import Button, { ButtonProps } from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../typings/generated/components-schema'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import SbEditable from 'storyblok-react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import LmMuiAvatar from '../avatar/LmMuiAvatar'

const mapSize = {
  dense: 'small',
  'lm-button-large': 'large'
}

const mapIconButtonSize = {
  dense: 'small'
}

const mapIconSize = {
  dense: 'small',
  'lm-button-large': 'large'
}

const mapAvatarSize = {
  dense: 'small',
  'lm-button-large': 'large',
  'lm-button-xlarge': 'xlarge'
}

const mapVariant = {
  'raised': 'contained',
  'outlined': 'outlined'
}

const useStyles = makeStyles((theme: Theme) => ({
  'lm-button-shaped': {
    borderRadius: '2em'
  },
  'lm-button-square': {
    borderRadius: '0'
  },
  'lm-button-xlarge': {
    fontSize: '30px',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    '& .MuiIcon-root': {
      fontSize: '30px'
    },
    '&.MuiFab-root': {
      height: '62px',
      minHeight: '62px'
    },
    '&.MuiFab-extended': {
      borderRadius: '31px'
    }
  },
  'icon-lm-button-xlarge': {
    '& .MuiIcon-root': {
      fontSize: '2rem'
    }
  },
  outlined: {
    '&.MuiIconButton-root': {
      border: `1px solid rgba(0,0,0,0.23)`
    },
    '&.MuiIconButton-colorSecondary': {
      border: `1px solid ${theme.palette.secondary.main}`
    },
    '&.MuiIconButton-colorPrimary': {
      border: `1px solid ${theme.palette.primary.main}`
    }
  }
}))

const LmMuiButton: FunctionComponent<{ content: ButtonStoryblok }> = ({ content }) => {
  const classes = useStyles()
  const disableRipple = !!(content.properties && content.properties.find(i => i === 'disable-ripple'))

  if (content.variant === 'fab') {
    return (
      <SbEditable content={content}>
        <Fab variant={content.label ? 'extended' : undefined}
             className={classes[content.size as string]}
             size={mapSize[content.size as string] || 'medium'}
             color={content.color as ButtonProps['color']}
             disableRipple={disableRipple}>
          {content.icon && content.icon.name && (
            <Icon fontSize={mapIconSize[content.size as string]}>{content.icon.name}</Icon>
          )}
          {content.image && (
            <LmMuiAvatar src={content.image} size={mapAvatarSize[content.size as string]} />
          )}
          {content.label}
          {content.trailing_icon && content.trailing_icon.name && (
            <Icon fontSize={mapIconSize[content.size as string]}>{content.trailing_icon.name}</Icon>
          )}
        </Fab>
      </SbEditable>
    )
  }
  if (!content.label) {
    return (
      <SbEditable content={content}>
        <IconButton color={content.color as IconButtonProps['color']}
                    size={mapIconButtonSize[content.size as string] || 'medium'}
                    disableRipple={disableRipple}
                    className={clsx(classes[content.variant as string], classes[`icon-${content.size}`])}>
          {content.icon && content.icon.name && (
            <Icon fontSize={mapIconSize[content.size as string]}>{content.icon.name}</Icon>
          )}
          {content.image && (
            <LmMuiAvatar src={content.image} size={mapAvatarSize[content.size as string]} />
          )}
        </IconButton>
      </SbEditable>
    )
  }

  return (
    <SbEditable content={content}>
      <Button size={mapSize[content.size as string]}
              className={clsx(classes[content.corners as string], classes[content.size as string])}
              variant={mapVariant[content.variant as string]}
              disabled={disableRipple}
              color={content.color as ButtonProps['color']}
              startIcon={content.icon && content.icon.name &&
              <Icon fontSize={mapIconSize[content.size as string]}>{content.icon.name}</Icon>}
              endIcon={content.trailing_icon && content.trailing_icon.name &&
              <Icon fontSize={mapIconSize[content.size as string]}>{content.trailing_icon.name}</Icon>}>
        {content.image && (
          <LmMuiAvatar src={content.image} size={mapAvatarSize[content.size as string]} />
        )}
        {content.label}
      </Button>
    </SbEditable>
  )
}
export default LmMuiButton
