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
import Section from './Section';
import * as React from 'react';
var items = [{
        text: '<h3>Hello World</h3>',
        component: 'paragraph',
        _uid: '789'
    }, {
        text: '<h4>Another Paragraph</h4>',
        _uid: '987',
        component: 'paragraph'
    }];
var column = [{
        body: items,
        _uid: '321',
        component: 'column'
    }];
var columns = [{
        body: items,
        _uid: '23424324432',
        component: 'column',
        width_general: '4'
    }, {
        body: items,
        _uid: '252435131',
        component: 'column',
        width_general: '4'
    }, {
        body: items,
        _uid: '341531545',
        component: 'column',
        width_general: '4'
    }];
var row = [{
        body: column,
        _uid: '123',
        component: 'row'
    }];
var props = {
    _uid: '34234',
    component: 'section',
    body: row
};
var background = __assign(__assign({}, props), { background: [{
            _uid: '2131',
            component: 'background',
            image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
        }] });
var columnSection = {
    _uid: '2234234',
    component: 'section',
    body: [{
            body: columns,
            _uid: '34241231',
            component: 'row'
        }]
};
storiesOf('Section', module)
    .add('Section', function () { return (<Section content={props}/>); })
    .add('Section with Image', function () { return (<Section content={background}/>); })
    .add('Section With Columns', function () { return (<Section content={columnSection}/>); });
