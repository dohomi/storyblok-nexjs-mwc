import Components from '@components'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper'
import { SectionStoryblok } from '../../typings/generated/components-schema'
import Container from '@material-ui/core/Container'
import BackgroundBox from './BackgroundBox'

export interface SectionProps extends SectionStoryblok {
  presetVariant?: SectionStoryblok['variant']
}

const Section: FunctionComponent<{ content: SectionProps }> = ({ content }) => {
  const isFullHeight = !!(content.property && content.property.includes('is_full_height'))
  const containerProps = backgroundPropertyHelper(content.background || [])
  const backgroundImage = containerProps.image


  const styles = {
    ...containerProps.styles,
    padding: !isFullHeight && content.padding || '2.5rem 0'
  }

  let sectionClassNames = clsx(
    containerProps.classNames,
    containerProps.classes, {
      ['lm-section__full-height']: !!isFullHeight
    })
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <BackgroundBox variant={content.variant || content.presetVariant} background={Array.isArray(content.background) && content.background[0]}>
        <Container>
          {body.map((blok) => Components(blok))}
        </Container>
      </BackgroundBox>
    </SbEditable>
  )
}

export default Section

/*


 <SectionWrap variant={content.variant}>
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
      </SectionWrap>

 */
