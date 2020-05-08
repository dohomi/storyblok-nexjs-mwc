import DrawerButton from './DrawerButton';
import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
const DrawerNavList = (props) => {
    const { content } = props;
    const body = content.body || [];
    return (React.createElement(List, { subheader: React.createElement(ListSubheader, null, content.header) }, body.map(blok => React.createElement(DrawerButton, { content: blok, key: blok._uid }))));
};
export default DrawerNavList;
