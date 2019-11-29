import InlineSVG from 'react-inlinesvg'
import React, { CSSProperties, FunctionComponent } from 'react'
import clsx from 'clsx'

const underscoreToMinus = (str: string) => str.replace(/_/g, '-')


const LmIcon: FunctionComponent<{
  className?: string,
  style?: CSSProperties
  iconName?: string
}> = ({ className, style, iconName }) => {
  return iconName ? (
    <InlineSVG
      style={style}
      className={clsx('lm-svg-icon', className)}
      onError={e => console.error(e)}
      src={`https://cdn.jsdelivr.net/gh/Templarian/MaterialDesign/svg/${underscoreToMinus(iconName)}.svg`} />
  ) : null
}

export default LmIcon
