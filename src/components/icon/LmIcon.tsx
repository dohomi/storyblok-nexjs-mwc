import InlineSVG from 'react-inlinesvg'
import React, { CSSProperties, FunctionComponent } from 'react'
import clsx from 'clsx'
import { ButtonStoryblok } from '../../typings/generated/components-schema'
import { makeStyles } from '@material-ui/core/styles/'

const underscoreToMinus = (str: string) => str.replace(/_/g, '-')

const useStyles = makeStyles({
  icon: {
    fill: 'currentColor',
    width: '1em',
    height: '1em'
  }
})

const LmIcon: FunctionComponent<{
  className?: string,
  iconUrl?: string
  style?: CSSProperties
  iconName?: string
  buttonSize?: ButtonStoryblok['size']
}> = ({ className, style, iconName, buttonSize, iconUrl }) => {
  const classes = useStyles()
  return (iconName || iconUrl) ? (
    <InlineSVG
      style={style}
      className={clsx(classes.icon, 'lm-svg-icon', className, { ['size__' + buttonSize]: buttonSize })}
      onError={e => console.error(e)}
      src={iconUrl ? iconUrl : `https://cdn.jsdelivr.net/gh/Templarian/MaterialDesign/svg/${underscoreToMinus(iconName as string)}.svg`} />
  ) : null
}

export default LmIcon
