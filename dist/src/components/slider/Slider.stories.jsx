import { storiesOf } from '@storybook/react';
import Slider from './Slider';
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
        body: columns,
        _uid: '123',
        component: 'row'
    }];
var section1 = {
    _uid: '123123',
    component: 'section',
    body: row
};
var section2 = {
    _uid: '324234',
    component: 'section',
    body: row
};
var section3 = {
    _uid: '1312321',
    component: 'section',
    body: row
};
var body = [section1, section2, section3];
var props = {
    component: 'slider',
    _uid: '123',
    body: body,
    property: ['arrows_dark', 'pagination_dark']
};
var props2 = {
    component: 'slider',
    _uid: '656565',
    body: body,
    background_color: {
        rgba: 'black'
    },
    section_variant: 'dark'
};
storiesOf('Slider', module)
    .add('Content Slider', function () { return (<Slider content={props}/>); })
    .add('Dark Slider', function () { return (<Slider content={props2}/>); });
