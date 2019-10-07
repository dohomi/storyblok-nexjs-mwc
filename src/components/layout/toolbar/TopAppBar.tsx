import clsx from 'clsx'
import {TopAppBar} from '@rmwc/top-app-bar'
import {withRouter} from 'next/dist/client/router'
import withWindowDimensions from '../../provider/WithWindowDimensions'
import scrollPositionHook from '../../../utils/hooks/scrollPositionHook'
import {useEffect, useState} from 'react'

function getClassName (props, pos = 0) {
  return clsx('lm-toolbar', {
    ['lm-toolbar__bold-text']: !!props.toolbarConfig.includes('text_bold'),
    ['lm-toolbar__fixed-width']: !!props.toolbarConfig.includes('fixed_width'),
    ['lm-toolbar-transparent']: props.transparentToolbar && pos < 128
  })
}

const TopAppBarWrapEl = (props) => {
  let scrollPos = scrollPositionHook()
  let [className, setClassName] = useState(getClassName(props)) // because of server/client hydration

  // let className = getClassName()
  useEffect(() => {
      setClassName(getClassName(props, scrollPos))
    },
    [scrollPos, props.transparentToolbar, props.dimensions]
  )

  return (
    <TopAppBar className={className} fixed={props.fixed}>
      {props.children}
    </TopAppBar>
  )
}

const TopAppBarWrap = withWindowDimensions(dimensions => ({dimensions}))(withRouter(TopAppBarWrapEl))

const TopAppBarBridge = (props) => {
  if (!props.transparentToolbar) {
    return (
      <TopAppBar className={getClassName(props)} fixed={props.fixed}>
        {props.children}
      </TopAppBar>
    )
  }
  return <TopAppBarWrap {...props}/>
}

export default TopAppBarBridge
