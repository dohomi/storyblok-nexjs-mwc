import { storiesOf } from '@storybook/react';
import Pricing from './Pricing';
import * as React from 'react';
var items = [{
        _uid: '4212',
        component: 'pricing_item',
        image: [{
                component: 'image',
                _uid: '1231',
                source: 'https://a.storyblok.com/f/57008/4541x2202/dc46a24330/bicycles-608747.jpg'
            }],
        price: [{
                component: 'headline',
                _uid: '2132',
                text: '100 $'
            }],
        title: [{
                component: 'headline',
                _uid: '2132',
                text: 'Product 1'
            }]
    }, {
        _uid: '1231',
        component: 'pricing_item',
        image: [{
                component: 'image',
                _uid: '1231',
                source: 'https://a.storyblok.com/f/57008/4541x2202/dc46a24330/bicycles-608747.jpg'
            }],
        title: [{
                _uid: '23412',
                component: 'headline',
                text: 'Product 2'
            }],
        price: [{
                component: 'headline',
                _uid: '2132',
                text: '110 $'
            }]
    }];
var props = {
    _uid: '123',
    component: 'pricing',
    body: items
};
storiesOf('Pricing', module)
    .add('Pricing', function () { return (<Pricing content={props}/>); });
