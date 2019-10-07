import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import {Link} from 'routes'
import {Button} from '@rmwc/button'
import {IconButton} from '@rmwc/icon-button'
import {Fab} from '@rmwc/fab'
import React from 'react'
import {componentLogger} from '../utils/componentLogger'
import {linkHandler} from '../utils/linkHandler'

export const mapButtonProps = (content) => {
  // const property = content.styles
  const color = content.color
  const size = content.size
  const icon = content.image || (content.icon && content.icon.name)
  const trailingIcon = content.trailing_icon && content.trailing_icon.name
  const properties = content.properties || []
  const additionalClasses = []
  let theme
  if (color) {
    if (color === 'primary') {
      theme = ['primaryBg', 'onPrimary']
    } else if (color === 'secondary') {
      theme = ['secondaryBg', 'onSecondary']
    } else if (color === 'primary_text') {
      theme = ['primary']
    } else if (color === 'secondary_text') {
      theme = ['secondary']
    } else if (color === 'light') {
      theme = ['textPrimaryOnDark']
    } else if (color === 'dark') {
      theme = ['textPrimaryOnLight']
    }
  }

  const variant = content.variant
  const buttonProps = {
    label: content.label,
    ripple: !properties.includes('disable-ripple')
  }
  variant && (buttonProps[variant] = true) // variants only available on buttons with label
  theme && (buttonProps.theme = theme)

  if (size === 'dense') {
    buttonProps.dense = true
  }

  if (size && size !== 'dense') {
    additionalClasses.push(size)
  }
  trailingIcon && (buttonProps.trailingIcon = trailingIcon)

  icon && (buttonProps.icon = icon)
  buttonProps.className = clsx(additionalClasses, content.corners, content.class_names && content.class_names.values)
  return buttonProps
}


const ButtonMwc = (props) => {
  const mappedProps = {
    ...props
  }
  // render Fab
  if (mappedProps.fab) {
    delete mappedProps.fab
    mappedProps.trailingIcon && !mappedProps.label && delete mappedProps.trailingIcon
    if (mappedProps.dense) {
      mappedProps.mini = true
      delete mappedProps.dense
    }
    return <Fab {...mappedProps} />
  }
  // render Button with or without icon
  if (mappedProps.label) {
    return <Button {...mappedProps}/>
  }
  // render IconButton
  if (mappedProps.trailingIcon) {
    mappedProps.onIcon = props.trailingIcon
    delete mappedProps.trailingIcon
  }
  delete mappedProps.raised
  delete mappedProps.unelevated
  delete mappedProps.outlined

  return <IconButton {...mappedProps}/>
}

const ButtonLink = (props) => {
  if (props.to) {
    return (
      <Link to={props.to}><a {...props}>{props.children}</a></Link>
    )
  }
  return (
    <a {...props} href={props.href}>{props.children}</a>
  )
}

const MtButton = ({content}) => {
  const buttonProps = mapButtonProps(content)
  let link = content.link || {}
  componentLogger(content)

  if (content.file) {
    // overwrites potential link values
    link = {cached_url: `https://${content.file}`}
  }
  linkHandler(buttonProps, link, {openExternal: !!content.open_external})

  buttonProps.tag = ButtonLink
  if (content.font) {
    buttonProps.style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }

  // console.log(buttonProps)
  return (
    <SbEditable content={content}>
      <ButtonMwc {...buttonProps} />
    </SbEditable>
  )
}

export default MtButton
