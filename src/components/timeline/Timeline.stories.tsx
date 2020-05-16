import { storiesOf } from '@storybook/react'
import React from 'react'
import Timeline from './Timeline'
import { storyTimeline, storyTimelineItem } from '../../storybook/core/section'
import { randomIntFromInterval, storyAvatar, storyImageUrls } from '../../storybook/core/various'


storiesOf('Timeline', module)
  .add(
    'Timeline',
    () => (
      <>
        <Timeline content={{
          ...storyTimeline(),
          body: [{
            ...storyTimelineItem({
              count: 1
            }),
            icon: [
              storyAvatar({
                count: 1,
                options: {
                  icon: {
                    name: 'airport'
                  }
                }
              })
            ]
          },
            {
              ...storyTimelineItem({ count: 2 }),
              icon: [storyAvatar({ count: 2, options: { icon: { name: 'home' } } })]
            },
            {
              ...storyTimelineItem({ count: 3 }),
              icon: [storyAvatar({
                count: 3,
                options: { image: storyImageUrls[randomIntFromInterval(0, storyImageUrls.length - 1)] }
              })]
            }
          ]
        }} />
      </>
    )
  )
