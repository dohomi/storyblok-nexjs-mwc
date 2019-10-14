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
import * as React from 'react';
import { customSettings, simpleSettings } from '../../../../.storybook/dummy/toolbar';
import { toggleLeftNavigation } from '../../../utils/state/actions';
import { Button } from '@rmwc/button';
import MwcDrawer from './MwcDrawer';
var props = __assign({}, simpleSettings);
var custom = __assign({}, customSettings);
storiesOf('Drawer', module)
    .add('Drawer Simple Toolbar', function () { return (<>
        <Button onClick={function () { return toggleLeftNavigation(); }}>Toggle Drawer</Button>
        <MwcDrawer content={props}/>
      </>); })
    .add('Drawer Custom Toolbar', function () { return (<>
        <Button onClick={function () { return toggleLeftNavigation(); }}>Toggle Drawer</Button>
        <MwcDrawer content={custom}/>
      </>); });
