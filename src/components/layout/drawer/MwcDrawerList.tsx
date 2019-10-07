import {List} from '@rmwc/list'
import CollapsibleListSection from './CollapsibleListSection'
import React from 'react'
import DrawerButton from './DrawerButton'
import DrawerSearch from './DrawerSeearch'


const Components = {
  'button': DrawerButton,
  'nav_menu': CollapsibleListSection,
  'toolbar_search': DrawerSearch
}

const Child = (blok) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], {...blok, key: blok._uid})
  }
  return React.createElement(() => (
    <div style={{color: 'red'}}>The component {blok.component} has not been created yet.</div>
  ), {key: blok._uid})
}

const DrawerContentList = (content) => {
  let childs = content.toolbar || []
  if (content.multi_toolbar && content.multi_toolbar.length) {
    childs = []
    content.multi_toolbar.forEach(row => {
      const rowItems = row.body || []
      rowItems.forEach(section => {
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
