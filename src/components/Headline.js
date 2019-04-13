import SbEditable from 'storyblok-react'
import React from 'react'
import clsx from 'clsx'
import {Typography} from '@rmwc/typography'
import {componentLogger} from '../utils/componentLogger'

const HeadlineContent = ({content}) => {
  if (content.text_xs) {
    return (
      <>
        <span className="d-none d-sm-block">{content.text}</span>
        <span className="d-block d-sm-none">{content.text_xs}</span>
      </>
    )
  }
  return content.text
}

const Headline = ({content}) => {
  componentLogger(content)
  const classes = clsx(content.style, content.style_props, content.class_names && content.class_names.values)
  const props = {
    className: {classes},
    tag: content.tag || 'h3',
    use: content.typography || 'headline4'
  }
  if (content.font) {
    props.style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }
  return (
    <SbEditable content={content}>
      <Typography {...props}>
        <HeadlineContent content={content}/>
      </Typography>
    </SbEditable>
  )
}


export default Headline
