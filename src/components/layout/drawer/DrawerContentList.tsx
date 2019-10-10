import { List } from '@rmwc/list'
import CollapsibleListSection from './CollapsibleListSection'
import React, { FunctionComponent } from 'react'
import DrawerButton from './DrawerButton'
import DrawerSearch from './DrawerSeearch'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  NavMenuStoryblok,
  ToolbarRowStoryblok,
  ToolbarSearchStoryblok
} from '../../../typings/generated/components-schema'

type DrawerContentComponents = {
  button: FunctionComponent<ButtonStoryblok>
  nav_menu: FunctionComponent<NavMenuStoryblok>
  toolbar_search: FunctionComponent<ToolbarSearchStoryblok>
  [k: string]: any
}

const Components: DrawerContentComponents = {
  'button': DrawerButton,
  'nav_menu': CollapsibleListSection,
  'toolbar_search': DrawerSearch
}

const Child = (blok: any) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { ...blok, key: blok._uid })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}

const DrawerContentList: FunctionComponent<GlobalStoryblok> = (content) => {
  let childs = content.toolbar || []
  if (content.multi_toolbar && content.multi_toolbar.length) {
    childs = []
    content.multi_toolbar.forEach(row => {
      const rowItems = row.body || []
      rowItems.forEach((section: ToolbarRowStoryblok) => {
        const sectionItems = section.body || []
        sectionItems.forEach(item => {
          if (['toolbar_search', 'button', 'nav_menu'].includes(item.component)) {
            childs.push(item)
          }
        })
      })
    })
  }
  return (
    <List>
      {childs.map(props => Child(props))}
    </List>
  )
}
export default DrawerContentList
