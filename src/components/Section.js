import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React from 'react'
import {ThemeProvider} from '@rmwc/theme'
import {section} from '../utils/themeContentSection'
import SectionWithBackground from './partials/SectionWithBackground'

const omit = (object, omit = []) => {
  const newObject = {}
  Object.keys(object).map(key => {
    !omit.includes(key) && (newObject[key] = object[key])
  })
  return newObject
}

const backgroundPropertyHelper = (properties) => {
  if (!Array.isArray(properties)) {
    return null
  }
  const values = properties[0] || {}
  const mapped = {
    ...values
  }
  console.log(mapped)

  return values
}

const Section = ({content}) => {
  const isFullHeight = content.property.includes('is_full_height')
  const backgroundProperties = backgroundPropertyHelper(content.background)
  const backgroundImage = backgroundProperties.image
  console.log(backgroundProperties)
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
    padding: !isFullHeight && content.padding || '2.5rem 0'
  }

  content.background_color && (styles.backgroundColor = content.background_color)


  let sectionClassNames = clsx(
    'lm-content-section',
    content.style, content.class_names && content.class_names.values, {
      ['lm-section__full-height']: !!isFullHeight
    })
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        {content.background_image ? (
          <SectionWithBackground classNames={sectionClassNames}
                                 {...content}
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
