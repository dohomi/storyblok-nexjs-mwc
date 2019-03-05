import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React from 'react'
import {ThemeProvider} from '@rmwc/theme'
import {section} from '../utils/themes'
import {useInView} from 'react-intersection-observer'
import SectionWithBackground from './SectionWithBackground'
import VisibilityContext from '../utils/VisibilityContext'

const Section = ({content}) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true // for inView only once..
  })
  const isFullHeight = content.property.includes('is_full_height')
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


  let sectionClassNames = clsx('lm-content-section', content.style, content.class_names && content.class_names.values, {
    ['lm-section__full-height']: !!isFullHeight
  })
  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <div ref={ref}>
          <VisibilityContext.Provider value={inView}>
            {content.background_image ? (
              <SectionWithBackground classNames={sectionClassNames} {...content} inView={inView} isFullHeight={isFullHeight}>
                {content.body.map((blok) => Components(blok))}
              </SectionWithBackground>
            ) : (
              <div className={sectionClassNames}
                   style={styles}>
                {content.body.map((blok) => Components(blok))}
              </div>
            )
            }
          </VisibilityContext.Provider>
        </div>
      </ThemeProvider>
    </SbEditable>
  )
}

export default Section
