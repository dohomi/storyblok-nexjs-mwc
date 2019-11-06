import DrawerButton from './DrawerButton'
import React, { FunctionComponent } from 'react'
import DrawerNavList from './DrawerNavList'
import { ButtonStoryblok, NavMenuStoryblok } from '../../../typings/generated/components-schema'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import List from '@material-ui/core/List'

type CollapsibleComponents = {
  button: FunctionComponent<ButtonStoryblok>
  nav_menu_item: FunctionComponent<ButtonStoryblok>
  nav_list: FunctionComponent<NavMenuStoryblok>
  [k: string]: any
}

const Components: CollapsibleComponents = {
  'button': DrawerButton,
  'nav_list': DrawerNavList,
  'nav_menu_item': DrawerButton
}

const Child = (blok: any) => {
  if (typeof Components[blok.component] !== 'undefined') {
    return React.createElement(Components[blok.component], { ...blok, key: blok._uid })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.component} has not been created yet at collapsible list
      section.</div>
  ), { key: blok._uid })
}

const CollapsibleListSection: FunctionComponent<NavMenuStoryblok> = (props) => {
  const body = props.body || []
  const items: any[] = []
  body.forEach(firstLevel => {
    if (firstLevel.body && firstLevel.body.length) {
      // mega menu // consist of row / column / nav_list | button
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

  return (
    <ExpansionPanel >
      <ExpansionPanelSummary expandIcon={<Icon>{'expand_more'}</Icon>}>
        <Typography>{props.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List>
          {Array.isArray(items) && items.map(blok => Child(blok))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default CollapsibleListSection
