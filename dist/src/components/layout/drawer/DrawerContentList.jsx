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
import { List } from '@rmwc/list';
import CollapsibleListSection from './CollapsibleListSection';
import React from 'react';
import DrawerButton from './DrawerButton';
import DrawerSearch from './DrawerSeearch';
var Components = {
    'button': DrawerButton,
    'nav_menu': CollapsibleListSection,
    'toolbar_search': DrawerSearch
};
var Child = function (blok) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], __assign(__assign({}, blok), { key: blok._uid }));
    }
    return React.createElement(function () { return (<div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>); }, { key: blok._uid });
};
var DrawerContentList = function (content) {
    var childs = content.toolbar || [];
    if (content.multi_toolbar && content.multi_toolbar.length) {
        childs = [];
        content.multi_toolbar.forEach(function (row) {
            var rowItems = row.body || [];
            rowItems.forEach(function (section) {
                var sectionItems = section.body || [];
                sectionItems.forEach(function (item) {
                    if (['toolbar_search', 'button', 'nav_menu'].includes(item.component)) {
                        childs.push(item);
                    }
                });
            });
        });
    }
    return (<List>
      {childs.map(function (props) { return Child(props); })}
    </List>);
};
export default DrawerContentList;
