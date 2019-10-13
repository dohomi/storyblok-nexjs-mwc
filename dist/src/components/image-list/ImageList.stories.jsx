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
import ImageList from './ImageList';
import * as React from 'react';
var body = [
    {
        _uid: '1',
        component: 'image_list_item',
        source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png',
        label: 'First image'
    },
    {
        _uid: '2',
        component: 'image_list_item',
        source: 'https://a.storyblok.com/f/57008/4541x2202/dc46a24330/bicycles-608747.jpg',
        label: 'Second image'
    }
];
var content = {
    _uid: '123',
    component: 'image_list',
    body: body
};
var content2 = {
    _uid: '123',
    component: 'image_list',
    body: body,
    enable_lightbox: true
};
var content3 = {
    _uid: '123',
    component: 'image_list',
    body: body,
    enable_lightbox: true,
    text_protection: true
};
var content4 = {
    _uid: '123',
    component: 'image_list',
    body: body,
    enable_lightbox: true,
    aspect_ratio: '1x1',
    column_gap: '16'
};
storiesOf('Image List', module)
    .add('Image List', function () { return (<ImageList content={content}/>); })
    .add('Image List Lightbox', function () { return (<ImageList content={content2}/>); })
    .add('Image List Protect', function () { return (<ImageList content={content3}/>); })
    .add('Image List Ratio', function () { return (<>
        <ImageList content={content4}/>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '4x3' })}/>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '3x4' })}/>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '16x9' })}/>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '2x3' })}/>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '3x2' })}/>
        <h4>Fit in color:</h4>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '3x2', fit_in_color: 'ccc' })}/>
        <ImageList content={__assign(__assign({}, content4), { aspect_ratio: '2x3', fit_in_color: 'ccc' })}/>
      </>); });
