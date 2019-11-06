import Button, { ButtonProps } from '@material-ui/core/Button'
import Fab, { FabProps } from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../typings/generated/components-schema'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import SbEditable from 'storyblok-react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import LmMuiAvatar from '../avatar/LmMuiAvatar'
import { Link } from '@routes'
import { getLinkAttrs, LinkType } from '../../utils/linkHandler'

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
  'outlined': 'outlined',
  'unelevated': 'contained'
}

const mapColor = {
  'dark': 'primary',
  'light': 'default',
  'primary': 'primary',
  'secondary': 'secondary',
  'primary_text': 'inherit',
  'secondary_text': 'inherit'
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&.lm-button-shaped': {
      borderRadius: '2em'
    },
    '&.lm-button-square': {
      borderRadius: '0'
    },
    '&.lm-button-xlarge': {
      fontSize: '30px',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      '& .MuiIcon-root': {
        fontSize: '2rem'
      },
      '&.MuiFab-root': {
        height: '62px',
        minHeight: '62px'
      },
      '&.MuiFab-extended': {
        borderRadius: '31px'
      }
    },
    '&.lm-outlined': {
      '&.MuiIconButton-root': {
        border: `1px solid rgba(0,0,0,0.23)`
      },
      '&.MuiIconButton-colorSecondary': {
        border: `1px solid ${theme.palette.secondary.main}`
      },
      '&.MuiIconButton-colorPrimary': {
        border: `1px solid ${theme.palette.primary.main}`
      }
    },
    '&.lm-unelevated': {
      boxShadow: 'none'
    }
  }
}))

const ButtonWrap: FunctionComponent<{ content: ButtonStoryblok }> = ({ content, children }) => {
  if (content.link) {
    const { rel, target, ...attrs } = getLinkAttrs(content.link as LinkType, { openExternal: !!content.open_external })
    return (
      <Link {...attrs}>
        <a rel={rel} target={target} className={'lm-link__button'}>{children}</a>
      </Link>
    )
  }
  return (
    <SbEditable content={content}>
      {children}
    </SbEditable>
  )
}

const LmMuiButton: FunctionComponent<{ content: ButtonStoryblok }> = ({ content }) => {
  const classes = useStyles()
  const properties = content.properties || []
  const disableRipple = !!properties.find(i => i === 'disable-ripple')
  const isUnelevated = properties.find(i => i === 'disable-shadow') || content.variant === 'unelevated'
  const color = content.color ? mapColor[content.color] : undefined
  const className = clsx(classes.button, {
    [content.corners as string]: !!content.corners,
    'lm-unelevated': isUnelevated,
    'lm-outlined': content.variant === 'outlined',
    [content.size as string]: !!content.size
  })
  if (content.variant === 'fab') {
    return (
      <ButtonWrap content={content}>
        <Fab variant={content.label ? 'extended' : undefined}
             className={className}
             size={mapSize[content.size as string] || 'medium'}
             color={color as FabProps['color']}
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
      </ButtonWrap>
    )
  }
  if (!content.label) {
    return (
      <ButtonWrap content={content}>
        <IconButton color={color as IconButtonProps['color']}
                    size={mapIconButtonSize[content.size as string] || 'medium'}
                    disableRipple={disableRipple}
                    className={className}>
          {content.icon && content.icon.name && (
            <Icon fontSize={mapIconSize[content.size as string]}>{content.icon.name}</Icon>
          )}
          {content.image && (
            <LmMuiAvatar src={content.image} size={mapAvatarSize[content.size as string]} />
          )}
        </IconButton>
      </ButtonWrap>
    )
  }

  return (
    <ButtonWrap content={content}>
      <Button size={mapSize[content.size as string]}
              className={className}
              variant={mapVariant[content.variant as string]}
              disabled={disableRipple}
              color={color as ButtonProps['color']}
              startIcon={content.icon && content.icon.name &&
              <Icon fontSize={mapIconSize[content.size as string]}>{content.icon.name}</Icon>}
              endIcon={content.trailing_icon && content.trailing_icon.name &&
              <Icon fontSize={mapIconSize[content.size as string]}>{content.trailing_icon.name}</Icon>}>
        {content.image && (
          <LmMuiAvatar src={content.image} size={mapAvatarSize[content.size as string]} />
        )}
        {content.label}
      </Button>
    </ButtonWrap>
  )
}
export default LmMuiButton
