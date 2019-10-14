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
import Divider from './Divider';
var props = {
    _uid: '123',
    component: 'divider',
    icon: {
        name: 'clear'
    }
};
var props2 = __assign(__assign({}, props), { icon: {
        name: 'home'
    }, icon_size: ['xxx-large'], width: 50 });
var props3 = __assign(__assign({}, props), { icon: {
        name: 'alarm'
    }, color: {
        rgba: 'rgba(22,333,1212,1)'
    } });
storiesOf('Divider', module)
    .add('Divider', function () { return (<>
        <div>
          <Divider content={props}/>
        </div>
        <div>
          <Divider content={props2}/>
        </div>
        <div>
          <Divider content={props3}/>
        </div>
      </>); });
