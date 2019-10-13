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
import IconMwc from './Icon';
var props = {
    _uid: '232123',
    component: 'icon',
    name: {
        name: 'home'
    },
    size: 'small'
};
var props1 = __assign(__assign({}, props), { name: {
        name: 'home'
    }, size: 'large' });
var props2 = __assign(__assign({}, props), { name: {
        name: 'home'
    }, size: 'medium', class_names: {
        values: ['text-secondary']
    } });
var props3 = __assign(__assign({}, props), { name: {
        name: 'home'
    }, size: 'xlarge', class_names: {
        values: ['text-primary']
    } });
storiesOf('Icon', module)
    .add('Icon', function () { return (<>
        <IconMwc content={props}/>
        <IconMwc content={props2}/>
        <IconMwc content={props1}/>
        <IconMwc content={props3}/>
      </>); });
