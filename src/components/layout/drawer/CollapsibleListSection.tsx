import React, { FunctionComponent } from 'react'
import { ButtonStoryblok, NavMenuStoryblok } from '../../../typings/generated/components-schema'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LmIcon from '../../icon/LmIcon'
import DrawerButton from './DrawerButton'
import DrawerNavList from './DrawerNavList'

const CollapsibleListSection: FunctionComponent<{
  content: NavMenuStoryblok & {
    parentUid?: string
  }
}> = (props) => {
  const { content } = props
  const body = content.body || []
  const items: any[] = []
  const [open, setOpen] = React.useState(false)


  const handleClick = () => {
    const currentOpenState = !open
    setOpen(currentOpenState)
  }

  body.forEach(firstLevel => {
    if (firstLevel.component === 'row') {
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
          {Array.isArray(items) && items.map(blok => Child({ ...blok, parentUid: content._uid }))}
        </List>
      </Collapse>
    </>
  )
}

export default CollapsibleListSection


type CollapsibleComponents = {
  button: FunctionComponent<{ content: ButtonStoryblok }>
  nav_menu_item: FunctionComponent<{ content: ButtonStoryblok }>
  nav_list: FunctionComponent<{ content: NavMenuStoryblok }>
  nav_menu: FunctionComponent<{ content: NavMenuStoryblok }>
  [k: string]: any
}

const Components: CollapsibleComponents = {
  'list_search_autocomplete': () => null,
  'button': DrawerButton,
  'nav_list': DrawerNavList,
  'nav_menu_item': DrawerButton,
  'nav_menu': CollapsibleListSection
}

function Child(blok: any) {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { content: blok, key: blok._uid })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet at collapsible list
      section.</div>
  ), { key: blok._uid })
}
