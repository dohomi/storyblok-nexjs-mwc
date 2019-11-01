import Components from '@components'
import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import SectionWithBackground from './SectionWithBackground'
import backgroundPropertyHelper from '../../utils/backgroundPropertyHelper'
import { SectionStoryblok } from '../../typings/generated/components-schema'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

export interface SectionProps extends SectionStoryblok {
  presetVariant?: SectionStoryblok['variant']
}

const useStyles = makeStyles({
  dark: {
    '& .MuiButton-root, & .MuiIconButton-root': {
      color: 'inherit'
    },
    '& .MuiButton-outlined': {
      borderColor: 'currentColor'
    }
  }
})

const mapBgColor = {
  dark: '#303030',
  primary: 'primary.main',
  secondary: 'secondary.main',
  light: '#fafafa'
}
const mapColor = {
  light: 'rgba(0, 0, 0, 0.87)',
  dark_text: 'rgba(0, 0, 0, 0.87)',
  dark: 'common.white',
  light_text: 'common.white'
}

const SectionWrap: FunctionComponent<{ variant: SectionStoryblok['variant'] }> = ({ variant, children }) => {
  const classes = useStyles()
  if (variant) {
    console.log(variant)
    return (
      <Box bgcolor={mapBgColor[variant]} color={mapColor[variant]} className={classes.dark}>
        <Container>
          {children}
        </Container>
      </Box>
    )
  }

  return (
    <Container>
      {children}
    </Container>
  )
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
    </SbEditable>
  )
}

export default Section
