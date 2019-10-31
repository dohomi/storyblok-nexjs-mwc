import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { componentLogger } from '../../utils/componentLogger'
import { HeadlineStoryblok } from '../../typings/generated/components-schema'
import Typography from '@material-ui/core/Typography'
import { mapTypographyVariant } from '../../utils/muiMapProps'

const Headline: FunctionComponent<{ content: HeadlineStoryblok }> = ({ content }) => {
  componentLogger(content)

  const props = { style: {} }
  if (content.font) {
    props.style = {
      '--mdc-theme-font-default': `var(--mdc-theme-font-${content.font})`
    }
  }
  return (
    <SbEditable content={content}>
      <Typography
        className={clsx(content.style, content.style_props, content.class_names && content.class_names.values)}
        component={content.tag}
        variant={mapTypographyVariant[content.typography as string] || 'headline4'}
        {...props}
      >
        {!!content.text_xs && (
          <>
            <span className="d-none d-sm-block">{content.text}</span>
            <span className="d-block d-sm-none">{content.text_xs}</span>
          </>
        )}
        {!content.text_xs && content.text}
      </Typography>
    </SbEditable>
  )
}


export default Headline
