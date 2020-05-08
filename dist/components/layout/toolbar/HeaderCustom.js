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
import SbEditable from 'storyblok-react';
import TopAppBarWrap from './TopAppBar';
import LmToolbarRow from './ToolbarRow';
import Divider from '../../divider/Divider';
import React from 'react';
var Components = {
    'toolbar_row': LmToolbarRow,
    'divider': Divider
};
var Child = function (blok, settings) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { key: blok._uid, content: blok, settings: settings });
    }
    return React.createElement(function () { return (React.createElement("div", { style: { color: 'red' } },
        "The component ",
        blok.component,
        " has not been created yet.")); }, { key: blok._uid });
};
var HeaderCustom = function (props) {
    var content = props.settings || {};
    var rows = content.multi_toolbar || [];
    var SystemBar = null;
    var systemBarProps = rows.find(function (item) { return item.is_system_bar; });
    if (systemBarProps) {
        SystemBar = Child(systemBarProps, content);
        // rows.splice(systemBarProps, 1)
        rows = rows.filter(function (i) { return i._uid !== systemBarProps._uid; });
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement(TopAppBarWrap, __assign({}, props, { SystemBar: SystemBar }), rows.map(function (p) { return Child(p, content); }))));
};
export default HeaderCustom;
