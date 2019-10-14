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
import Table from './Table';
import * as React from 'react';
var body = {
    tbody: [[
            'Content 1 1',
            'Content 1 2',
            'Content 1 3'
        ], [
            'Content 2 1',
            'Content 2 2',
            'Content 2 3'
        ], [
            'Content 3 1',
            'Content 3 2',
            'Content 3 3'
        ]],
    thead: [
        'Head 1',
        'Head 2',
        'Head 3'
    ]
};
var props = {
    _uid: '123',
    component: 'table',
    body: body
};
storiesOf('Table', module)
    .add('Table', function () { return (<Table content={props}/>); })
    .add('Table without head', function () { return (<Table content={__assign(__assign({}, props), { disable_table_head: true })}/>); })
    .add('Table variants', function () { return (<>
        <div><h3>Bordered</h3></div>
        <Table content={__assign(__assign({}, props), { variant: 'bordered' })}/>
        <div><br /></div>
        <div><h3>Bordered Bold</h3></div>
        <Table content={__assign(__assign({}, props), { variant: 'bordered-bold' })}/>
        <div><br /></div>
        <div><h3>Boxed</h3></div>
        <Table content={__assign(__assign({}, props), { variant: 'boxed' })}/>
        <div><br /></div>
        <div><h3>Comparison</h3></div>
        <Table content={__assign(__assign({}, props), { variant: 'comparison' })}/>
        <div><br /></div>
        <div><h3>Price</h3></div>
        <Table content={__assign(__assign({}, props), { variant: 'price' })}/>
      </>); });
