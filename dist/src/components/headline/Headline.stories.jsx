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
import Headline from './Headline';
var props = {
    _uid: '12312',
    component: 'headline',
    text: 'Headline1',
    typography: 'headline1'
};
var props1 = __assign(__assign({}, props), { text: 'Headline2', typography: 'headline2' });
var props2 = __assign(__assign({}, props), { text: 'Headline3', typography: 'headline3' });
var props3 = __assign(__assign({}, props), { text: 'Headline4', typography: 'headline4' });
var props4 = __assign(__assign({}, props), { text: 'Headline5', typography: 'headline5' });
var props5 = __assign(__assign({}, props), { text: 'Headline6', typography: 'headline6' });
var props6 = __assign(__assign({}, props), { text: 'subtitle', typography: 'subtitle1' });
var props7 = __assign(__assign({}, props), { text: 'subtitle2', typography: 'subtitle2' });
storiesOf('Headline', module)
    .add('Headline', function () { return (<>
        <Headline content={props}/>
        <Headline content={props1}/>
        <Headline content={props2}/>
        <Headline content={props3}/>
        <Headline content={props4}/>
        <Headline content={props5}/>
        <Headline content={props6}/>
        <Headline content={props7}/>
      </>); });
