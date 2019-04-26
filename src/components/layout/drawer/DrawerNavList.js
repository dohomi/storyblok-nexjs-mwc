import {ListGroup, ListGroupSubheader} from '@rmwc/list'
import DrawerButton from './DrawerButton'

const DrawerNavList = (props) => {
  const body = props.body || []
  return (
    <ListGroup>
      <ListGroupSubheader>{props.header}</ListGroupSubheader>
      {body.map(blok => <DrawerButton {...blok} key={blok._uid}/>)}
    </ListGroup>
  )
}

export default DrawerNavList
