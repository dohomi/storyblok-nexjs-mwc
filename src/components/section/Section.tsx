import Components from '@components'
import SbEditable from 'storyblok-react'
import React, { CSSProperties, FunctionComponent } from 'react'
import { SectionStoryblok } from '../../typings/generated/components-schema'
import Container, { ContainerProps } from '@material-ui/core/Container'
import BackgroundBox, { BackgroundBoxProps } from './BackgroundBox'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import BackgroundImage from './BackgroundImage'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

export interface SectionProps extends SectionStoryblok {
  presetVariant?: SectionStoryblok['variant']
}

const useStyles = makeStyles({
  fullHeight: {
    width: '100%',
    height: '100%',
    minHeight: '100vh'
  },
  background: {
    position: 'relative',
    overflow: 'hidden',
    '& .MuiGrid-root': {
      position: 'relative'
    }
  },
  dark: {
    '& .MuiButton-root.lm-default-color, & .MuiIconButton-root.lm-default-color': {
      color: 'inherit',
      '&.MuiButton-outlined,&.lm-outlined': {
        borderColor: 'currentColor'
      }
    }
  }
})

const Section: FunctionComponent<{ content: SectionProps }> = ({ content }) => {
  const classes = useStyles()
  const theme = useTheme()
  const body = content.body || []
  let containerStyles: CSSProperties = {
    paddingTop: '2.5rem', // todo make this customizable through theme?
    paddingBottom: '2.5rem'
  }
  const isFullHeight = !!(content.property && content.property.includes('is_full_height'))
  if (!isFullHeight && content.padding) {
    const splitPadding = content.padding.split(' ')
    containerStyles = {
      paddingTop: splitPadding[0] ? splitPadding[0] : undefined,
      paddingBottom: splitPadding[0] ? splitPadding[0] : undefined
      // paddingLeft: splitPadding[1] ? splitPadding[1] : undefined,
      // paddingRight: splitPadding[1] ? splitPadding[1] : undefined
    }
  }
  const background = Array.isArray(content.background) && content.background[0]
  let maxWidth: ThemeOptions['defaultContainerWidth'] = theme.defaultContainerWidth
  if (content.max_width) {
    maxWidth = content.max_width === 'none' ? false : content.max_width
  }
  return (
    <SbEditable content={content}>
      <BackgroundBox variant={content.variant || content.presetVariant}
                     background={background}
                     backgroundStyle={content.background_style}>
        {(values: BackgroundBoxProps) => {
          return (
            <div className={clsx(classes.background, { [classes.dark]: !!content.variant }, values.className)}
                 style={values.style}>
              {background && background.image &&
              <BackgroundImage content={background} backgroundStyle={content.background_style} />}
              <Container style={containerStyles}
                         maxWidth={maxWidth as ContainerProps['maxWidth']}
                         className={clsx(values.className, {
                           [classes.fullHeight]: isFullHeight
                         })}>
                {body.map((blok) => Components(blok))}
              </Container>
            </div>
          )
        }}
      </BackgroundBox>
    </SbEditable>
  )
}

export default Section
