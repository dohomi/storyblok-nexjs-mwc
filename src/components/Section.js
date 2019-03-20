import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React from 'react'
import {ThemeProvider} from '@rmwc/theme'
import {section} from '../utils/themeContentSection'
import SectionWithBackground from './partials/SectionWithBackground'
import backgroundPropertyHelper from '../utils/backgroundPropertyHelper'

const Section = ({content}) => {
  const isFullHeight = content.property.includes('is_full_height')
  const containerProps = backgroundPropertyHelper(content.background)
  const backgroundImage = containerProps.image
  let theme = {}
  const variant = content.variant
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
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        {backgroundImage ? (
          <SectionWithBackground className={sectionClassNames}
                                 {...content}
                                 containerProps={containerProps}
                                 style={styles}
                                 isFullHeight={isFullHeight}>
            {content.body.map((blok) => Components(blok))}
          </SectionWithBackground>
        ) : (
          <div className={sectionClassNames}
               style={styles}>
            {content.body.map((blok) => Components(blok))}
          </div>
        )}
      </ThemeProvider>
    </SbEditable>
  )
}

export default Section
