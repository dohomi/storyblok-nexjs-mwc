import DrawerButton from './DrawerButton'
import React, { FunctionComponent } from 'react'
import DrawerNavList from './DrawerNavList'
import { ButtonStoryblok, NavMenuStoryblok } from '../../../typings/generated/components-schema'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { ListItemIcon } from '@material-ui/core'
import LmIcon from '../../icon/LmIcon'

type CollapsibleComponents = {
  button: FunctionComponent<{ content: ButtonStoryblok }>
  nav_menu_item: FunctionComponent<{ content: ButtonStoryblok }>
  nav_list: FunctionComponent<{ content: NavMenuStoryblok }>
  [k: string]: any
}

const Components: CollapsibleComponents = {
  'list_search_autocomplete': () => null,
  'button': DrawerButton,
  'nav_list': DrawerNavList,
  'nav_menu_item': DrawerButton
}

const Child = (blok: any) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { content: blok, key: blok._uid })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet at collapsible list
      section.</div>
  ), { key: blok._uid })
}

const CollapsibleListSection: FunctionComponent<{ content: NavMenuStoryblok }> = (props) => {
  const { content } = props
  const body = content.body || []
  const items: any[] = []
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  body.forEach(firstLevel => {
    if (firstLevel.body && firstLevel.body.length) {
      // mega menu: consist of row / column / nav_list | button
      firstLevel.body.forEach((secondLevel: any) => {
        if (secondLevel.body && secondLevel.body.length) {
          secondLevel.body.forEach((thirdLevel: any) => {
            items.push(thirdLevel)
          })
        }
      })
    } else {
      // simple menu
      items.push(firstLevel)
    }
  })

  const startIconName = content.start_icon && content.start_icon.name
  return (
    <>
      <ListItem button onClick={handleClick}>
        {startIconName && (
          <ListItemIcon>
            <LmIcon iconName={startIconName} style={{
              width: '1.5rem',
              height: '1.5rem'
            }}></LmIcon>
          </ListItemIcon>
        )}
        <ListItemText primary={content.title} />
        {open ? <ChevronUp /> : <ChevronDown />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ marginLeft: startIconName ? '55px' : '20px' }}>
          {Array.isArray(items) && items.map(blok => Child(blok))}
        </List>
      </Collapse>
    </>
  )
}

export default CollapsibleListSection
