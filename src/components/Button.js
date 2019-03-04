import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import {Link} from '../routes'
import {Button, ButtonIcon} from '@rmwc/button'
import React from 'react'

const MtButton = (props) => {
  const content = props.content
  const link = content.link || {}
  // const property = content.styles
  const color = content.color
  const size = content.size
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
  variant && (buttonProps[variant] = true)
  theme && (buttonProps.theme = theme)

  if (size === 'dense') {
    buttonProps.dense = true
  }

  if (size && size !== 'dense') {
    additionalClasses.push(size)
  }

  buttonProps.className = clsx(additionalClasses, content.corners)
  // console.log(buttonProps)
  return (
    <SbEditable content={content}>
      {link.linktype === 'story' ? (
        <Link route={`/${link.cached_url}`}>
          <Button {...buttonProps} href={`/${link.cached_url}`}/>
        </Link>
      ) : <Button {...buttonProps} href={`/${link.cached_url}`}/>}
    </SbEditable>
  )
}

export default MtButton
