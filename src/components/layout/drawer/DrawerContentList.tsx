import CollapsibleListSection from './CollapsibleListSection'
import React, { FunctionComponent } from 'react'
import DrawerButton from './DrawerButton'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  NavMenuStoryblok,
  ToolbarRowStoryblok
} from '../../../typings/generated/components-schema'

type DrawerContentComponents = {
  button: FunctionComponent<ButtonStoryblok>
  nav_menu: FunctionComponent<NavMenuStoryblok>
  [k: string]: any
}

const Components: DrawerContentComponents = {
  'button': DrawerButton,
  'nav_menu': CollapsibleListSection,
  'list_search_autocomplete': () => null
}

const Child = (blok: any) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { ...blok, key: blok._uid })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>
  ), { key: blok._uid })
}

const DrawerContentList: FunctionComponent<Partial<GlobalStoryblok>> = (content) => {
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
    <>
      {childs.map(props => Child(props))}
    </>
  )
}
export default DrawerContentList
