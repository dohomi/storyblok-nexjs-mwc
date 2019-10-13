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
import CardList from './CardList';
import * as React from 'react';
var cardListBody = [{
        _uid: '123',
        component: 'card_list_item',
        title: 'Toll',
        subtitle: 'SubTitle',
        image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
    }, {
        _uid: '123123',
        component: 'card_list_item',
        title: 'Toll',
        subtitle: 'SubTitle',
        image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
    }, {
        _uid: '12321312',
        component: 'card_list_item',
        title: 'Toll',
        subtitle: 'SubTitle',
        image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
    }, {
        _uid: '123213123',
        component: 'card_list_item',
        title: 'Toll',
        subtitle: 'SubTitle',
        image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
    }];
var cardList = {
    _uid: '12311',
    component: 'card_list',
    body: cardListBody
};
storiesOf('Card List Standard', module)
    .add('Card List', function () { return (<CardList content={cardList}/>); })
    .add('Card List Over Image', function () { return (<CardList content={__assign(__assign({}, cardList), { variant: ['over_media', 'font_white', 'title_top'] })}/>); });
