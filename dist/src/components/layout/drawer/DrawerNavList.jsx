import { ListGroup, ListGroupSubheader } from '@rmwc/list';
import DrawerButton from './DrawerButton';
import * as React from 'react';
var DrawerNavList = function (props) {
    var body = props.body || [];
    return (<ListGroup>
      <ListGroupSubheader>{props.header}</ListGroupSubheader>
      <h2>here</h2>
      {body.map(function (blok) { return <DrawerButton {...blok} key={blok._uid}/>; })}
    </ListGroup>);
};
export default DrawerNavList;
