import { storiesOf } from '@storybook/react';
import Iframe from './Iframe';
var props = {
    _uid: '2313',
    component: 'iframe',
    url: 'https://www.youtube.com/embed/4jms7cNugXo',
};
storiesOf('Iframe', module)
    .add('Iframe', function () { return (<>
        <Iframe content={props}/>
      </>); });
