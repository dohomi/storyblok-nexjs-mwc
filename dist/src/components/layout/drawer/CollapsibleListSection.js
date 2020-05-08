import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { ChevronDown, ChevronUp } from 'mdi-material-ui';
import { ListItemIcon } from '@material-ui/core';
import LmIcon from '../../icon/LmIcon';
import DrawerButton from './DrawerButton';
import DrawerNavList from './DrawerNavList';
const CollapsibleListSection = (props) => {
    const { content } = props;
    const body = content.body || [];
    const items = [];
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        const currentOpenState = !open;
        setOpen(currentOpenState);
    };
    body.forEach(firstLevel => {
        if (firstLevel.component === 'row') {
            // mega menu: consist of row / column / nav_list | button
            firstLevel.body.forEach((secondLevel) => {
                if (secondLevel.body && secondLevel.body.length) {
                    secondLevel.body.forEach((thirdLevel) => {
                        items.push(thirdLevel);
                    });
                }
            });
        }
        else {
            // simple menu
            items.push(firstLevel);
        }
    });
    const startIconName = content.start_icon && content.start_icon.name;
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem, { button: true, onClick: handleClick },
            startIconName && (React.createElement(ListItemIcon, null,
                React.createElement(LmIcon, { iconName: startIconName, style: {
                        width: '1.5rem',
                        height: '1.5rem'
                    } }))),
            React.createElement(ListItemText, { primary: content.title }),
            open ? React.createElement(ChevronUp, null) : React.createElement(ChevronDown, null)),
        React.createElement(Collapse, { in: open, timeout: "auto", unmountOnExit: true },
            React.createElement(List, { component: "div", disablePadding: true, style: { marginLeft: startIconName ? '55px' : '20px' } }, Array.isArray(items) && items.map(blok => Child(Object.assign(Object.assign({}, blok), { parentUid: content._uid })))))));
};
export default CollapsibleListSection;
const Components = {
    'list_search_autocomplete': () => null,
    'button': DrawerButton,
    'nav_list': DrawerNavList,
    'nav_menu_item': DrawerButton,
    'nav_menu': CollapsibleListSection
};
function Child(blok) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { content: blok, key: blok._uid });
    }
    return React.createElement(() => (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet at collapsible list section.")), { key: blok._uid });
}
