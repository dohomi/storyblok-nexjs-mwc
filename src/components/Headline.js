import SbEditable from 'storyblok-react'
import React from 'react'
import clsx from 'clsx'
import {Typography} from '@rmwc/typography'
import {componentLogger} from '../utils/componentLogger'

const Headline = ({content}) => {
  componentLogger(content)
  const classes = clsx(content.style, content.style_props, content.class_names && content.class_names.values)
  return (
    <SbEditable content={content}>
      <Typography className={classes}
                  tag={content.tag || 'h3'}
                  use={content.typography || 'headline4'}>
        {content.text}
      </Typography>
    </SbEditable>
  )
}


export default Headline
