import { storiesOf } from '@storybook/react';
import HubspotMeeting from './HubspotMeeting';
import * as React from 'react';
var props = {
    _uid: '123',
    component: 'hubspot_meeting',
    meeting_name: 'hello165'
};
storiesOf('Hubspot Meeting', module)
    .add('Hubspot Meeting', function () { return (<HubspotMeeting content={props} disableEmbed={true}/>); });
