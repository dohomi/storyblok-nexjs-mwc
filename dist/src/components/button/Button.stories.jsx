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
import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
var defaultProps = {
    label: 'Text Button',
    _uid: '123',
    component: 'button'
};
var variant1 = __assign(__assign({}, defaultProps), { label: 'Large Button', size: 'lm-button-large' });
var variant2 = __assign(__assign({}, defaultProps), { label: 'Small Button', size: 'dense' });
var variant3 = __assign(__assign({}, defaultProps), { label: 'Outline Button', variant: 'outlined' });
storiesOf('Button', module)
    .add('Text Button', function () { return (<>
        <Button content={defaultProps}/>
        <Button content={variant1}/>
        <Button content={variant2}/>
        <Button content={variant3}/>
      </>); })
    .add('Primary Button', function () { return (<>
        <Button content={__assign(__assign({}, defaultProps), { color: 'primary' })}/>
        <Button content={__assign(__assign({}, variant1), { color: 'primary' })}/>
        <Button content={__assign(__assign({}, variant2), { color: 'primary' })}/>
        <Button content={__assign(__assign({}, variant3), { color: 'primary' })}/>
      </>); })
    .add('Mixed Button', function () { return (<>
        <Button content={__assign(__assign({}, defaultProps), { variant: 'outlined' })}/>
        <Button content={__assign(__assign({}, defaultProps), { color: 'secondary_text' })}/>
        <Button content={__assign(__assign({}, defaultProps), { color: 'secondary' })}/>
        <Button content={__assign(__assign({}, variant1), { color: 'secondary' })}/>
        <Button content={__assign(__assign({}, variant2), { color: 'primary_text' })}/>
        <Button content={__assign(__assign({}, variant3), { color: 'dark' })}/>
      </>); });
