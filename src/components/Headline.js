import SbEditable from 'storyblok-react'
import React from 'react'
import clsx from 'clsx'

const Headline = (props) => {
  const content = props.content
  let text = content.text
  let typography = content.typography || 'headline4'
  const tag = content.tag || 'h3'
  const classes = clsx(
    'mdc-typography',
    `mdc-typography--${typography}`,
    content.style,
    content.style_props
  )
  const Tag = tag
  return (
    <SbEditable content={content}>
      <Tag className={classes}>
        {text}
      </Tag>
    </SbEditable>
  )
}

export default Headline
