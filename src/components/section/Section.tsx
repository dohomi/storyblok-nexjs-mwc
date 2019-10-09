import Components from 'components'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import { ThemeProvider } from '@rmwc/theme'
import { section } from '../../utils/themeContentSection'
import SectionWithBackground from './SectionWithBackground'
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper'
import { SectionStoryblok } from '../../typings/generated/components-schema'

export interface SectionProps extends SectionStoryblok {
  presetVariant?: Pick<SectionStoryblok, 'variant'>
}

const Section: FunctionComponent<{ content: SectionProps }> = ({ content }) => {
  const isFullHeight = !!(content.property && content.property.includes('is_full_height'))
  const containerProps = backgroundPropertyHelper(content.background)
  const backgroundImage = containerProps.image
  let theme = {}
  const variant = content.variant || (content.presetVariant && content.presetVariant.variant)
  // configure some theming variants
  if (variant) {
    const sectionVariant = section[variant]
    if (!sectionVariant) {
      console.info(`Theme section variant does not exist: ${variant}`)
    } else {
      theme = sectionVariant
    }
  }

  const styles = {
    ...containerProps.styles,
    padding: !isFullHeight && content.padding || '2.5rem 0'
  }

  let sectionClassNames = clsx(
    'lm-content-section',
    containerProps.classNames,
    containerProps.classes, {
      ['lm-section__full-height']: !!isFullHeight
    })
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        {backgroundImage ? (
          <SectionWithBackground className={sectionClassNames}
                                 {...content}
                                 containerProps={containerProps}
                                 style={styles}
                                 isFullHeight={isFullHeight}>
            {body.map((blok) => Components(blok))}
          </SectionWithBackground>
        ) : (
          <div className={sectionClassNames}
               style={styles}>
            {body.map((blok) => Components(blok))}
          </div>
        )}
      </ThemeProvider>
    </SbEditable>
  )
}

export default Section
