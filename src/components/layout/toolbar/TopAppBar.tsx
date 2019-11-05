import clsx from 'clsx'
import scrollPositionHook from '../../../utils/hooks/scrollPositionHook'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider'
import { useRouter } from 'next/router'
import { GlobalStoryblok } from '../../../typings/generated/components-schema'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'


type AppTopAppProps = {
  transparentToolbar: boolean
  toolbarConfig: GlobalStoryblok['toolbar_config']
  fixed: boolean
  variant: GlobalStoryblok['toolbar_variant']
}

const mapToolbarColor = {
  'primary': 'primary',
  'secondary': 'secondary',
  'dark': 'primary',
  'white': 'inherit'
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
    <AppBar className={className}
            color={mapToolbarColor[props.variant || 'default']}
            position={props.fixed ? 'fixed' : 'relative'}>
      <Toolbar>
        {props.children}
      </Toolbar>
    </AppBar>
  )
}

const TopAppBarBridge: FunctionComponent<AppTopAppProps> = (props) => {
  if (!props.transparentToolbar) {
    const toolbarConfig = props.toolbarConfig || []
    console.log(props.variant)
    return (
      <AppBar className={clsx({
        ['lm-toolbar__bold-text']: toolbarConfig.includes('text_bold'),
        ['lm-toolbar__fixed-width']: toolbarConfig.includes('fixed_width'),
        [`lm-toolbar__${props.variant}`]: props.variant
      })}
              color={mapToolbarColor[props.variant || 'default']}
              position={props.fixed ? 'fixed' : 'relative'}>
        <Toolbar>
          {props.children}
        </Toolbar>
      </AppBar>
    )
  }
  return <TopAppBarWrap {...props} />
}

export default TopAppBarBridge
