import { storiesOf } from '@storybook/react';
import SectionParallax from './SectionParallax';
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
var parallax = [
    {
        _uid: '234123421',
        component: 'parallax_item',
        image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
    }
];
var props = {
    _uid: '123sd',
    component: 'section_parallax',
    body: row,
    elements: parallax
};
storiesOf('Section Parallax', module)
    .add('Section Parallax', function () { return (<SectionParallax content={props}/>); });
