var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var CollapsibleListSection = function (props) {
    var content = props.content;
    var body = content.body || [];
    var items = [];
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var handleClick = function () {
        var currentOpenState = !open;
        setOpen(currentOpenState);
    };
    body.forEach(function (firstLevel) {
        if (firstLevel.component === 'row') {
            // mega menu: consist of row / column / nav_list | button
            firstLevel.body.forEach(function (secondLevel) {
                if (secondLevel.body && secondLevel.body.length) {
                    secondLevel.body.forEach(function (thirdLevel) {
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
    var startIconName = content.start_icon && content.start_icon.name;
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
            React.createElement(List, { component: "div", disablePadding: true, style: { marginLeft: startIconName ? '55px' : '20px' } }, Array.isArray(items) && items.map(function (blok) { return Child(__assign(__assign({}, blok), { parentUid: content._uid })); })))));
};
export default CollapsibleListSection;
var Components = {
    'list_search_autocomplete': function () { return null; },
    'button': DrawerButton,
    'nav_list': DrawerNavList,
    'nav_menu_item': DrawerButton,
    'nav_menu': CollapsibleListSection
};
function Child(blok) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { content: blok, key: blok._uid });
    }
    return React.createElement(function () { return (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet at collapsible list section.")); }, { key: blok._uid });
}
