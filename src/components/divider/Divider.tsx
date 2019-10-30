import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import { CSSProperties, FunctionComponent } from 'react'
import { DividerStoryblok } from '../../typings/generated/components-schema'
import { makeStyles } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import * as React from 'react'

const useStyles = makeStyles({
  hSeparator: {
    clear: 'both',
    width: '100%',
    color: '#ccc',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '1px',
    '& > div, > div > div > div': {
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderColor: 'transparent'
    },
    '& div > span:before': {
      right: '100%'
    },
    '& div > span:after': {
      left: '100%'
    },
    '& div > span:before, & div > span:after': {
      content: '""',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'absolute',
      top: '50%',
      height: 0,
      width: '2000px',
      borderTopWidth: 'inherit',
      borderTopStyle: 'solid',
      borderColor: 'currentColor'
    },
    '& div > span': {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      height: 'inherit',
      borderColor: 'inherit',
      color: 'inherit',
      borderTopWidth: 'inherit',
      borderTopStyle: 'solid',

      '&> .material-icons': {
        color: 'inherit'
      }
    }
  },
  hSeparatorIcon: {
    height: '24px',
    textAlign: 'center',
    '&.large': {
      height: '32px'
    },
    '& div > div > i': {
      '&:before': {
        marginRight: '15px'
      },
      '&:after': {
        marginLeft: '15px'
      }
    }
  }
})

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
  const classes = useStyles()

  const style: CSSProperties = {}
  const iconName = content.icon && content.icon.name
  const iconSize = content.size
  if (content.color && content.color.rgba) {
    style.color = content.color.rgba
  }
  if (iconSize) {
    style.height = `${iconSize}px`
  }
  const className = clsx(classes.hSeparator, iconName && classes.hSeparatorIcon, content.class_names && content.class_names.values)
  const childStyle: CSSProperties = {
    borderTopWidth: `${content.thickness || 1}px`
  }
  if (content.width) {
    childStyle.width = `${content.width}%`
  }
  if (iconName) {
    return (
      <Wrap content={content} style={style} childStyle={childStyle} className={className}>
        <div>
          <div style={{ borderTopWidth: `${content.thickness || 1}px` }}>
            <span>
              <Icon style={{
                fontSize: iconSize + 'px',
                marginTop: `${content.thickness || 1}px`
              }}>{iconName}</Icon>
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
