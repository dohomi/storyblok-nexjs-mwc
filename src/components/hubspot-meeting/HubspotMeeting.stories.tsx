import { storiesOf } from '@storybook/react'
import HubspotMeeting from './HubspotMeeting'
import * as React from 'react'
import { storyHubspotMeeting } from '../../../.storybook/dummy/core/various'

storiesOf('Hubspot Meeting', module)
  .add(
    'Hubspot Meeting 1',
    () => (
      <HubspotMeeting content={storyHubspotMeeting({ options: { meeting_name: 'hello165' } })} disableEmbed={true} />
    )
  )
  .add(
    'Hubspot Meeting 2',
    () => (
      <HubspotMeeting content={storyHubspotMeeting({ options: { meeting_name: 'maxuhlig81' } })} disableEmbed={true} />
    )
  )
