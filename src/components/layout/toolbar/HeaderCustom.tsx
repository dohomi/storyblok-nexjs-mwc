import SbEditable from 'storyblok-react'
import TopAppBarWrap, { AppHeaderProps } from './TopAppBar'
import LmToolbarRow from './ToolbarRow'
import Divider from '../../divider/Divider'
import React, { FunctionComponent } from 'react'
import { DividerStoryblok, GlobalStoryblok, ToolbarRowStoryblok } from '../../../typings/generated/components-schema'

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
  const content = props.settings || {}
  let rows = content.multi_toolbar || []

  let SystemBar = null
  const systemBarProps = rows.find(item => item.is_system_bar)
  if (systemBarProps) {
    SystemBar = Child(systemBarProps, content)
    // rows.splice(systemBarProps, 1)
    rows = rows.filter(i => i._uid !== systemBarProps._uid)
  }
  return (
    <SbEditable content={content}>
      <TopAppBarWrap {...props} SystemBar={SystemBar}>
        {rows.map(p => Child(p, content))}
      </TopAppBarWrap>
    </SbEditable>
  )
}

export default HeaderCustom
