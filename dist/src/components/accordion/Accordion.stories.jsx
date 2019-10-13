import { storiesOf } from '@storybook/react';
import Accordion from './Accordion';
import * as React from 'react';
var contentArray = [{
        _uid: '532',
        component: 'headline',
        text: 'Some Headline'
    }, {
        component: 'paragraph',
        _uid: '123312',
        text: 'Some Paragraph'
    }
];
var props = {
    _uid: '123',
    component: 'accordion',
    body: [
        {
            _uid: '1234',
            component: 'accordion_item',
            title: 'First Headline',
            body: contentArray
        }, {
            _uid: '122311',
            component: 'accordion_item',
            title: 'Second Headline',
            body: contentArray
        }
    ]
};
storiesOf('Accordion', module)
    .add('Accordion', function () { return (<Accordion content={props}/>); });
