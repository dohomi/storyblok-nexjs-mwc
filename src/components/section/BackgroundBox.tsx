import React, { FunctionComponent } from 'react'
import { BackgroundStoryblok, SectionStoryblok } from '../../typings/generated/components-schema'
import Box, { BoxProps } from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import BackgroundImage from './BackgroundImageContainer'

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
  light_text: 'common.white',
  primary: 'common.white',
  secondary: 'common.white'
}


const BackgroundBox: FunctionComponent<{
  background?: BackgroundStoryblok,
  variant?: SectionStoryblok['variant'],
  skipClone?: boolean
  skipBgImage?: boolean
}> = ({ children, background, variant, skipBgImage, skipClone }) => {
  // todo padding !
  if (!background && !variant) {
    return (
      <>{children}</>
    )
  }
  background = background || {} as BackgroundStoryblok
  const classes = useStyles()
  const canClone = !background.image && !(background.background_elements && background.background_elements.length)
  const boxProps: BoxProps['css'] = {
    bgcolor: (background.background_color && background.background_color.rgba) || mapBgColor[variant as string],
    border: background.border_size,
    borderColor: background.border_color && background.border_color.rgba,
    borderRadius: background.border_radius,
    position: 'relative',
    color: mapColor[variant as string],
    boxShadow: background.elevation
  }

  return canClone || skipBgImage ? (
    <Box {...boxProps}
         className={clsx({
           [classes.dark]: !!variant
         })}
         clone={!skipClone}>
      {children}
    </Box>
  ) : (
    <Box className={clsx({ [classes.dark]: !!variant })}
         {...boxProps}
    >
      {!!background.image && <BackgroundImage image={background.image} />}
      {children}
    </Box>
  )
}

export default BackgroundBox
