import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React from 'react'
import {ThemeProvider} from '@rmwc/theme'
import {section} from '../utils/themeContentSection'
import SectionWithBackground from './partials/SectionWithBackground'

const backgroundPropertyHelper = (properties) => {
  if (!Array.isArray(properties)) {
    return {}
  }
  const values = properties[0]
  if (Object.keys(values).length === 0) {
    return {}
  }
  const mapped = {
    image: values.image,
    styles: {
      borderColor: values.border_color && values.border_color.rgba,
      backgroundColor: values.background_color && values.background_color.rgba,
      borderRadius: values.border_radius,
      borderStyle: values.border_style,
      borderSize: values.border_size
    },
    classNames: values.classNames && values.classNames.values,
    classes: {
      [`mdc-elevation--z${values.elevation}`]: !!values.elevation
    },
    imageProperties: values.image_properties
  }
  console.log(values)
  console.log(mapped)
  return mapped
}

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

  content.background_color && (styles.backgroundColor = content.background_color)


  let sectionClassNames = clsx(
    'lm-content-section',
    containerProps.classNames,
    containerProps.classes, {
      ['lm-section__full-height']: !!isFullHeight
    })
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        {backgroundImage || content.background_image ? (
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
