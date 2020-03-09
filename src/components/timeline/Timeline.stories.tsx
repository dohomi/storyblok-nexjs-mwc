import { storiesOf } from '@storybook/react'
import React from 'react'
import Timeline from './Timeline'
import { storyTimeline, storyTimelineItem } from '../../../.storybook/dummy/core/section'
import { storyAvatar } from '../../../.storybook/dummy/core/various'

const timelineProps = {
  ...storyTimeline({}),
  body: [
    storyTimelineItem({
      count: 1,
      options: {
        icon: [
          storyAvatar({
            options: {
              icon: {
                name: 'airport'
              }
            }
          })
        ]
      }
    }),
    storyTimelineItem({ count: 2 }),
    storyTimelineItem({ count: 3 })
  ]
}
console.log(timelineProps)
storiesOf('Timeline', module)
  .add(
    'Timeline',
    () => (
      <>
        <Timeline content={timelineProps} />
      </>
    )
  )
