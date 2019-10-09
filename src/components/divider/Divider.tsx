import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { CSSProperties, FunctionComponent } from 'react'
import { DividerStoryblok } from '../../typings/generated/components-schema'

const Wrap: FunctionComponent<{
  content: DividerStoryblok
  style: CSSProperties
  className: string
  childStyle: CSSProperties
}> = ({ content, children, style, className, childStyle }) => (
  <SbEditable content={content}>
    <div className={className} style={style}>
      <div style={childStyle}>{children}</div>
    </div>
  </SbEditable>
)

const Divider: FunctionComponent<{ content: DividerStoryblok }> = ({ content }) => {
  const style: CSSProperties = {}
  const iconName = content.icon && content.icon.name
  const iconSize = content.icon_size
  if (content.color && content.color.rgba) {
    style.color = content.color.rgba
  }
  if (iconSize) {
    style.height = `${iconSize}px`
  }
  const className = clsx(
    'h-separator',
    content.class_names && content.class_names.values, {
      divider: !iconName,
      'h-separator-icon': iconName
    })
  const childStyle: CSSProperties = {
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
    const iconStyle: CSSProperties = {
      marginTop: `${content.thickness || 1}px`
    }
    if (iconSize) {
      iconStyle.fontSize = `${iconSize}px`
    }
    return (
      <Wrap content={content} style={style} childStyle={childStyle} className={className}>
        <div>
          <div style={{ borderTopWidth: `${content.thickness || 1}px` }}>
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
      <span />
    </Wrap>
  )
}

export default Divider
