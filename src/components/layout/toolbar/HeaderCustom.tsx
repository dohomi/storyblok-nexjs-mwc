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
  const rows = content.multi_toolbar || []

  return (
    <SbEditable content={content}>
      <TopAppBarWrap {...props}>
        {rows.map(p => Child(p, content))}
      </TopAppBarWrap>
    </SbEditable>
  )
}

export default HeaderCustom
