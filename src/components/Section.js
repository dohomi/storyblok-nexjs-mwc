import Components from 'components/index'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React from 'react'
import {ThemeProvider} from '@rmwc/theme'
import {section} from '../utils/themes'
import {useInView} from 'react-intersection-observer'
import SectionWithBackground from './SectionWithBackground'
import VisibilityContext from '../utils/VisibilityContext'

const Section = props => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true // for inView only once..
  })
  const content = props.content
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
    padding: content.padding || '2.5rem 0'
  }
  if (content.background_color) {
    styles.backgroundColor = content.background_color
  }


  return (
    <SbEditable content={content}>
      <ThemeProvider options={theme}>
        <div ref={ref}>
          <VisibilityContext.Provider value={inView}>
            {content.background_image ? SectionWithBackground({...content, inView})
              : (
                <div className={clsx('content-section', props.content.style, props.content.style_props)} style={styles}>
                  {props.content.body.map((blok) => Components({...blok, inView}))}
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
