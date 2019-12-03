import InlineSVG from 'react-inlinesvg'
import React, { CSSProperties, FunctionComponent, useMemo } from 'react'
import clsx from 'clsx'
import { ButtonStoryblok } from '../../typings/generated/components-schema'
import { makeStyles } from '@material-ui/core/styles/'
import { useInView } from 'react-intersection-observer'
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig'

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
  people: 'account-multiple',
  access_time: 'clock-outline',
  compare_arrows: 'compare'
}

const LmIcon: FunctionComponent<{
  className?: string,
  iconUrl?: string
  style?: CSSProperties
  iconName?: string
  buttonSize?: ButtonStoryblok['size']
}> = ({ className, style, iconName, buttonSize, iconUrl }) => {
  const classes = useStyles()
  const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions)
  iconName = iconName ? iconMap[iconName as string] || iconName : undefined
  const iconSrc = useMemo<string>(
    () => {
      if (inView && (iconUrl || iconName)) {
        return iconUrl ? iconUrl : `https://cdn.jsdelivr.net/npm/@mdi/svg/svg/${underscoreToMinus(iconName as string)}.svg`
      }
      return ''
    },
    [inView]
  )
  return (iconName || iconUrl) ? (
    <span ref={refIntersectionObserver}>
      {iconSrc && <InlineSVG
        style={style}
        className={clsx(classes.icon, 'lm-svg-icon', className, { ['size__' + buttonSize]: buttonSize })}
        onError={() => {
          console.error(`Icon not found: ${iconName}`)
          // console.error(e)
        }}
        src={iconSrc} />}
    </span>
  ) : null
}

export default LmIcon
