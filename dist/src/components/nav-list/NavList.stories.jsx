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
import { storiesOf } from '@storybook/react';
import NavList from './NavList';
import * as React from 'react';
var props = {
    _uid: '123',
    component: 'nav_list',
    header: 'Test',
    body: [{
            _uid: '123123',
            component: 'nav_item',
            name: 'First'
        }, {
            _uid: '12asd',
            component: 'nav_item',
            name: 'Second'
        }, {
            _uid: '12312',
            component: 'nav_item',
            name: 'Third'
        }]
};
storiesOf('Nav List', module)
    .add('Nav List', function () { return (<NavList content={props}/>); })
    .add('Nav List Column', function () { return (<NavList content={__assign(__assign({}, props), { collapse_on_mobile: true, properties: ['flex-column'] })}/>); });
