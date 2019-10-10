import clsx from 'clsx'
import { TopAppBar } from '@rmwc/top-app-bar'
import scrollPositionHook from '../../../utils/hooks/scrollPositionHook'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider'
import { useRouter } from 'next/router'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'

type AppTopAppProps = {
  transparentToolbar: boolean
  toolbarConfig: GlobalStoryblok['toolbar_config']
  fixed: boolean
}

function getClassName(props: AppTopAppProps, pos = 0) {
  const toolbarConfig = props.toolbarConfig || []
  return clsx('lm-toolbar', {
    ['lm-toolbar__bold-text']: toolbarConfig.includes('text_bold'),
    ['lm-toolbar__fixed-width']: toolbarConfig.includes('fixed_width'),
    ['lm-toolbar-transparent']: props.transparentToolbar && pos < 128
  })
}

const TopAppBarWrap: FunctionComponent<AppTopAppProps> = (props) => {
  const dimensions = useWindowDimensions()
  const { asPath } = useRouter()
  let scrollPos = scrollPositionHook()
  let [className, setClassName] = useState(getClassName(props)) // because of server/client hydration

  // let className = getClassName()
  useEffect(() => {
      setClassName(getClassName(props, scrollPos)) // todo is this necessary? maybe different approach
    },
    [scrollPos, props.transparentToolbar, dimensions, asPath]
  )

  return (
    <TopAppBar className={className} fixed={props.fixed}>
      {props.children}
    </TopAppBar>
  )
}

const TopAppBarBridge: FunctionComponent<AppTopAppProps> = (props) => {
  if (!props.transparentToolbar) {
    return (
      <TopAppBar className={getClassName(props)} fixed={props.fixed}>
        {props.children}
      </TopAppBar>
    )
  }
  return <TopAppBarWrap {...props} />
}

export default TopAppBarBridge
