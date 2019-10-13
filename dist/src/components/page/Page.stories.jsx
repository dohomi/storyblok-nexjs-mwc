import { storiesOf } from '@storybook/react';
import Page from './Page';
var props = {
    _uid: '123',
    component: 'page'
};
storiesOf('Page', module)
    .add('Page', function () { return (<Page content={props}/>); });
