import { ListGroup, ListGroupSubheader } from '@rmwc/list'
import DrawerButton from './DrawerButton'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { NavMenuStoryblok } from '../../../typings/generated/components-schema'

const DrawerNavList: FunctionComponent<NavMenuStoryblok> = (props) => {
  const body = props.body || []
  return (
    <ListGroup>
      <ListGroupSubheader>{props.header}</ListGroupSubheader>
      <h2>here</h2>
      {body.map(blok => <DrawerButton {...blok} key={blok._uid} />)}
    </ListGroup>
  )
}

export default DrawerNavList
