import { storiesOf } from '@storybook/react';
import SectionVideoBg from './SectionVideoBg';
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
var row = [{
        body: column,
        _uid: '123',
        component: 'row'
    }];
var props = {
    component: 'section_video_bg',
    _uid: '2341',
    url: 'https://youtu.be/P1qaAGWUz5U',
    body: row,
    property: [],
    height: 50
};
storiesOf('Section Video', module)
    .add('Section Video', function () { return (<SectionVideoBg content={props}/>); });
