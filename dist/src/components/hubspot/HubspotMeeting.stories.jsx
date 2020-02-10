import {storiesOf} from '@storybook/react'
import HubspotMeeting from './HubspotMeeting'
import * as React from 'react'

storiesOf('Hubspot Meeting', module)
  .add(
    'Hubspot Meeting 1',
    () => (
      <HubspotMeeting content={{
        _uid: '123',
        component: 'hubspot_meeting',
        meeting_name: 'hello165'
      }} disableEmbed={true} />)
  )
  .add(
    'Hubspot Meeting 2',
    () => (
      <HubspotMeeting content={{
        _uid: '3212',
        component: 'hubspot_meeting',
        meeting_name: 'maxuhlig81'
      }
      } disableEmbed={true} />)
  )
