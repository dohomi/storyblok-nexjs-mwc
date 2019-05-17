import SbEditable from 'storyblok-react'
import clsx from 'clsx'

const Wrap = ({content, children, style, className, childStyle}) => (
  <SbEditable content={content}>
    <div className={className} style={style}>
      <div style={childStyle}>{children}</div>
    </div>
  </SbEditable>
)

const Divider = ({content}) => {
  const style = {}
  const iconName = content.icon && content.icon.name
  const iconSize = content.icon_size
  if (content.color && content.color.rgba) {
    style.color = content.color.rgba
  }
  if (iconSize) {
    style.height = `${iconSize}px`
  }
  const className = clsx('h-separator', {
    divider: !iconName,
    'h-separator-icon': iconName
  })
  const childStyle = {
    borderTopWidth: `${content.thickness || 1}px`
  }
  if (content.width) {
    childStyle.width = `${content.width}%`
  }
  if (iconName) {
    const iconClasses = clsx(
      'material-icons',
      'rmwc-icon'
    )
    const iconStyle = {
      marginTop: `${content.thickness || 1}px`
    }
    if (iconSize) {
      iconStyle.fontSize = `${iconSize}px`
    }
    return (
      <Wrap content={content} style={style} childStyle={childStyle} className={className}>
        <div>
          <div style={{borderTopWidth: `${content.thickness || 1}px`}}>
            <span>
              <i className={iconClasses} style={iconStyle}>{iconName}</i>
            </span>
          </div>
        </div>
      </Wrap>
    )
  }
  return (
    <Wrap content={content} style={style} childStyle={childStyle} className={className}>
      <span/>
    </Wrap>
  )
}

export default Divider
