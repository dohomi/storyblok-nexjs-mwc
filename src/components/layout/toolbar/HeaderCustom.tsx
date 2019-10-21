import SbEditable from 'storyblok-react'
import { ThemeProvider } from '@rmwc/theme'
import TopAppBarWrap from './TopAppBar'
import { toolbar } from '../../../utils/themeContentSection'
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar'
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
  const color = content.toolbar_variant
  let theme = toolbar.primary
  const toolbarAdjust: RefObject<HTMLDivElement> = createRef()
  if (color) {
    theme = toolbar[color]
  }

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
      <ThemeProvider options={theme}>
        <TopAppBarWrap transparentToolbar={!!transparentToolbar}
                       toolbarConfig={toolbarConfig}
                       fixed={toolbarConfig.includes('fixed')}>
          {rows.map(p => Child(p, content))}
        </TopAppBarWrap>
      </ThemeProvider>
      {!props.hasFeature && <TopAppBarFixedAdjust ref={toolbarAdjust} />}
    </SbEditable>
  )
}

export default HeaderCustom
