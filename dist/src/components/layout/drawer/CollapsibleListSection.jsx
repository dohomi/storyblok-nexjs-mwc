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
import { CollapsibleList, SimpleListItem } from '@rmwc/list';
import DrawerButton from './DrawerButton';
import React from 'react';
import DrawerNavList from './DrawerNavList';
var Components = {
    'button': DrawerButton,
    'nav_list': DrawerNavList,
    'nav_menu_item': DrawerButton
};
var Child = function (blok) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], __assign(__assign({}, blok), { key: blok._uid }));
    }
    return React.createElement(function () { return (<div style={{ color: 'red' }}>The component {blok.component} has not been created yet at collapsible list section.</div>); }, { key: blok._uid });
};
var CollapsibleListSection = function (props) {
    var body = props.body || [];
    var items = [];
    body.forEach(function (firstLevel) {
        if (firstLevel.body && firstLevel.body.length) {
            // mega menu // consist of row / column / nav_list | button
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
    return (<CollapsibleList handle={<SimpleListItem text={props.title} metaIcon="chevron_right"/>}>
      {items.map(function (blok) { return Child(blok); })}
    </CollapsibleList>);
};
export default CollapsibleListSection;
