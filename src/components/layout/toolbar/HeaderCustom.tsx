import SbEditable from 'storyblok-react'
import TopAppBarWrap from './TopAppBar'
import LmToolbarRow from './ToolbarRow'
import Divider from '../../divider/Divider'
import React, { createRef, FunctionComponent, RefObject, useEffect } from 'react'
import { DividerStoryblok, GlobalStoryblok, ToolbarRowStoryblok } from '../../../typings/generated/components-schema'
import { useWindowDimensions } from '../../provider/WindowDimensionsProvider'

export type AppHeaderProps = {
  settings: GlobalStoryblok,
  hasFeature?: boolean
  hasRightDrawer?: boolean
}

type HeaderComponents = {
  toolbar_row: FunctionComponent<{ content: ToolbarRowStoryblok, settings: GlobalStoryblok }>
  divider: FunctionComponent<{ content: DividerStoryblok }>
  [k: string]: any
}

const Components: HeaderComponents = {
  'toolbar_row': LmToolbarRow,
  'divider': Divider
}

const Child = (blok: any, settings: GlobalStoryblok) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { key: blok._uid, content: blok, settings })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}

const HeaderCustom: FunctionComponent<AppHeaderProps> = (props) => {
  const dimensions = useWindowDimensions()
  const content = props.settings || {}
  let toolbarConfig = content.toolbar_config || []
  const transparentToolbar = props.hasFeature
  const rows = content.multi_toolbar || []
  const toolbarAdjust: RefObject<HTMLDivElement> = createRef()

  useEffect(
    () => {
      // adjust padding top
      const toolbar = document.querySelector('.lm-toolbar')
      const toolbarAdjustElement = toolbarAdjust.current
      toolbarAdjustElement && toolbar && (toolbarAdjustElement.style.paddingTop = `${toolbar.clientHeight + 1}px`)
    },
    [dimensions]
  )


  return (
    <SbEditable content={content}>
      <TopAppBarWrap transparentToolbar={!!transparentToolbar}
                     variant={content.toolbar_variant}
                     toolbarConfig={toolbarConfig}
                     fixed={toolbarConfig.includes('fixed')}>
        {rows.map(p => Child(p, content))}
      </TopAppBarWrap>
      {!props.hasFeature && <div ref={toolbarAdjust} />}
    </SbEditable>
  )
}

export default HeaderCustom
