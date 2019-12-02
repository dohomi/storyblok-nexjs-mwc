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

const iconMap = {
  call: 'phone',
  people: 'account-multiple'
}

const LmIcon: FunctionComponent<{
  className?: string,
  iconUrl?: string
  style?: CSSProperties
  iconName?: string
  buttonSize?: ButtonStoryblok['size']
}> = ({ className, style, iconName, buttonSize, iconUrl }) => {
  const classes = useStyles()
  iconName = iconName ? iconMap[iconName as string] || iconName : undefined
  return (iconName || iconUrl) ? (
    <InlineSVG
      style={style}
      className={clsx(classes.icon, 'lm-svg-icon', className, { ['size__' + buttonSize]: buttonSize })}
      onError={e => {
        console.error(`Icon not found: ${iconName}`)
        console.error(e)
      }}
      src={iconUrl ? iconUrl : `https://cdn.jsdelivr.net/npm/@mdi/svg/svg/${underscoreToMinus(iconName as string)}.svg`} />
  ) : null
}

export default LmIcon
