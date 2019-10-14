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
import ButtonList from './ButtonList';
var defaultProps = {
    label: 'Text Button',
    _uid: '123',
    component: 'button'
};
var variant1 = __assign(__assign({}, defaultProps), { label: 'Large Button', size: 'lm-button-large', _uid: '1235' });
var props = __assign(__assign({}, defaultProps), { component: 'button_list', body: [defaultProps, variant1] });
var props2 = __assign(__assign({}, props), { body: [defaultProps, variant1], property: ['align_right'] });
storiesOf('Button List', module)
    .add('Button List', function () { return (<>
        <div>
          <ButtonList content={props2}/>
        </div>
        <div>
          <ButtonList content={props}/>
        </div>
      </>); });
