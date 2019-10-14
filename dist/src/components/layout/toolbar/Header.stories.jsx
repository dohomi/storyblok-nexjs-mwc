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
import Header from './Header';
import * as React from 'react';
import { customSettings, simpleSettings } from '../../../../.storybook/dummy/toolbar';
storiesOf('Header', module)
    .add('Header Simple', function () { return (<>
        <h3>Default</h3>
        <Header settings={simpleSettings} hasFeature={false}/>
        <h3>Secondary</h3>
        <Header settings={__assign(__assign({}, simpleSettings), { toolbar_variant: 'secondary' })} hasFeature={false}/>
        <h3>Dark</h3>
        <Header settings={__assign(__assign({}, simpleSettings), { toolbar_variant: 'dark' })} hasFeature={false}/>
        <h3>White</h3>
        <Header settings={__assign(__assign({}, simpleSettings), { toolbar_variant: 'white' })} hasFeature={false}/>
      </>); })
    .add('Header Custom', function () { return (<Header settings={customSettings} hasFeature={false}/>); });
