import { storiesOf } from '@storybook/react';
import Html from './Html';
var props = {
    component: 'html',
    _uid: '1231',
    body: '<h3>hello world</h3>'
};
storiesOf('HTML', module)
    .add('HTML', function () { return (<>
        <Html content={props}/>
      </>); });
