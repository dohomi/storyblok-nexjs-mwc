import { storiesOf } from '@storybook/react'
import React from 'react'
import Timeline from './Timeline'
import { storyTimeline, storyTimelineItem } from '../../../.storybook/dummy/core/section'

storiesOf('Timeline', module)
  .add(
    'Timeline',
    () => (
      <>
        <Timeline content={{
          ...storyTimeline(),
          body: [
            storyTimelineItem({ count: 1 }),
            storyTimelineItem({ count: 2 }),
            storyTimelineItem({ count: 3 })
          ]
        }} />
      </>
    )
  )
