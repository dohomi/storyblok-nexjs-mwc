import DrawerButton from './DrawerButton';
import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
var DrawerNavList = function (props) {
    var content = props.content;
    var body = content.body || [];
    return (React.createElement(List, { subheader: React.createElement(ListSubheader, null, content.header) }, body.map(function (blok) { return React.createElement(DrawerButton, { content: blok, key: blok._uid }); })));
};
export default DrawerNavList;
