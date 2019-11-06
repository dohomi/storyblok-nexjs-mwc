import DrawerButton from './DrawerButton'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { NavMenuStoryblok } from '../../../typings/generated/components-schema'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

const DrawerNavList: FunctionComponent<NavMenuStoryblok> = (props) => {
  const body = props.body || []
  return (
    <List subheader={
      <ListSubheader>{props.header}</ListSubheader>
    }>
      {body.map(blok => <DrawerButton {...blok} key={blok._uid} />)}
    </List>
  )
}

export default DrawerNavList
