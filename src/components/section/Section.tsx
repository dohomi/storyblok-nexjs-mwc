import Components from '@components'
import SbEditable from 'storyblok-react'
import React, { CSSProperties, FunctionComponent } from 'react'
import { SectionStoryblok } from '../../typings/generated/components-schema'
import Container from '@material-ui/core/Container'
import BackgroundBox from './BackgroundBox'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export interface SectionProps extends SectionStoryblok {
  presetVariant?: SectionStoryblok['variant']
}

const useStyles = makeStyles({
  fullHeight: {
    width: '100%',
    height: '100vh'
  }
})

const Section: FunctionComponent<{ content: SectionProps }> = ({ content }) => {
  const classes = useStyles()
  const body = content.body || []
  let containerStyles: CSSProperties = {
    paddingTop: '2.5rem', // todo make this customizable through theme?
    paddingBottom: '2.5rem'
  }
  const isFullHeight = !!(content.property && content.property.includes('is_full_height'))
  if (!isFullHeight && content.padding) {
    containerStyles = { padding: content.padding }
  }
  return (
    <SbEditable content={content}>
      <BackgroundBox variant={content.variant || content.presetVariant}
                     skipClone={true}
                     background={Array.isArray(content.background) && content.background[0]}
                     backgroundStyle={content.background_style}>
        <Container style={containerStyles}
                   maxWidth={content.max_width === 'none' ? false : (content.max_width || 'lg')}
                   className={clsx({
                     [classes.fullHeight]: isFullHeight
                   })}>
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
