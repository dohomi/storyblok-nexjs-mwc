import React, { CSSProperties, FunctionComponent } from 'react'
import {
  BackgroundElementItemStoryblok,
  BackgroundStoryblok,
  SectionStoryblok
} from '../../typings/generated/components-schema'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import imageService from '../../utils/ImageService'


function multipleBackgroundComposer(backgroundElements?: BackgroundElementItemStoryblok[]) {
  if (!Array.isArray(backgroundElements)) {
    return {}
  }
  const elements = backgroundElements.map(item => {
    const url = imageService(item.url || '', '')
    return {
      background: `url('${url}') ${item.horizontal || 'left'} ${item.vertical || 'top'} ${item.repeat || 'no-repeat'}`,
      backgroundSize: item.size || 'auto'
    }
  })
  return {
    background: elements.map(i => i.background).join(','),
    backgroundSize: elements.map(i => i.backgroundSize).join(',')
  }
}

export type BackgroundBoxProps = {
  style?: CSSProperties
  className?: string
}

const BackgroundBox: FunctionComponent<{
  background?: BackgroundStoryblok,
  variant?: SectionStoryblok['variant'],
  skipBgImage?: boolean
  backgroundStyle?: SectionStoryblok['background_style'],
}> = ({ children, background, variant }) => {
  if (!background && !variant) {
    return (
      <>{typeof children === 'function' ? children({}) : children}</>
    )
  }
  const theme = useTheme()

  const mapBgColor = {
    dark: '#303030',
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    light: '#fafafa'
  }
  const mapColor = {
    light: 'rgba(0, 0, 0, 0.87)',
    dark_text: 'rgba(0, 0, 0, 0.87)',
    dark: theme.palette.common.white,
    light_text: theme.palette.common.white,
    primary: theme.palette.common.white,
    secondary: theme.palette.common.white
  }
  background = background || {} as BackgroundStoryblok
  let border = undefined
  if (background.border_color && background.border_color.rgba) {
    border = `${background.border_size || 1}px ${background.border_style || 'solid'} ${background.border_color && background.border_color.rgba}`
  } else if (background.border_radius) {
    border = '1px solid transparent'
  }

  const style: CSSProperties = {
    backgroundColor: (background.background_color && background.background_color.rgba) || mapBgColor[variant as string],
    border,
    borderRadius: background.border_radius,
    color: mapColor[variant as string],
    boxShadow: background.elevation ? theme.shadows[background.elevation] : undefined,
    minHeight: background.height ? background.height : undefined,
    ...multipleBackgroundComposer(background.background_elements)
  }
  Object.keys(style).forEach((key) => !style[key] && delete style[key])

  const className = clsx(background.classNames && background.classNames.values)

  return typeof children === 'function' ? children({ className, style }) : children
}

export default BackgroundBox
