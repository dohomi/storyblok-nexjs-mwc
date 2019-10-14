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
import ImageElement from './ImageElement';
import * as React from 'react';
var props = {
    _uid: '123',
    component: 'image',
    source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
};
var props2 = __assign(__assign({}, props), { property: ['rounded-circle'] });
var svg = __assign(__assign({}, props), { source: 'https://a.storyblok.com/f/57008/x/7dea868beb/cc_icons-badge_029.svg' });
storiesOf('Image', module)
    .add('Image', function () { return (<ImageElement content={props}/>); })
    .add('Image Rounded Circle', function () { return (<ImageElement content={props2}/>); })
    .add('Image SVG', function () { return (<ImageElement content={svg}/>); });
