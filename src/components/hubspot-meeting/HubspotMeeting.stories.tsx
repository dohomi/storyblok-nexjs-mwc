import { storiesOf } from '@storybook/react'
import HubspotMeeting from './HubspotMeeting'
import { HubspotMeetingStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const props: HubspotMeetingStoryblok = {
  _uid: '123',
  component: 'hubspot_meeting',
  meeting_name: 'hello165'
}
storiesOf('Hubspot Meeting', module)
  .add(
    'Hubspot Meeting',
    () => (
      <HubspotMeeting content={props} disableEmbed={true} />
    )
  )
