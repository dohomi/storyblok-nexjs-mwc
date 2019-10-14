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
import Paragraph from './Paragraph';
var props = {
    _uid: '123',
    component: 'paragraph',
    text: 'Hello World'
};
storiesOf('Paragraph', module)
    .add('Paragraph', function () { return (<>
        <Paragraph content={props}/>
        <Paragraph content={__assign(__assign({}, props), { typography: 'subtitle2' })}/>
        <Paragraph content={__assign(__assign({}, props), { typography: 'headline5' })}/>
        <Paragraph content={__assign(__assign({}, props), { typography: 'headline5' })}/>
        <Paragraph content={__assign(__assign({}, props), { typography: 'body2' })}/>
      </>); });
