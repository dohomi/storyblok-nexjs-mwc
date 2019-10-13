import { storiesOf } from '@storybook/react';
import Promotion from './Promotion';
import * as React from 'react';
var props = {
    _uid: '123',
    component: 'promotion',
    image: [{
            source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
        }],
    body: [{
            _uid: '41231',
            component: 'promotion_item',
            variant: 'variant-1',
            position: 'top_right',
            body: [{
                    component: 'paragraph',
                    _uid: '123',
                    text: 'Paragraph'
                }, {
                    component: 'headline',
                    _uid: '3212',
                    text: 'Headline'
                }]
        }]
};
storiesOf('Promotion', module)
    .add('Promotion', function () { return (<Promotion content={props}/>); });
