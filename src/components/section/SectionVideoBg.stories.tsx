import { storiesOf } from '@storybook/react'
import SectionVideoBg from './SectionVideoBg'
import * as React from 'react'
import { storyBackground, storyColumn, storyRow, storySectionVideoBg } from '../../../.storybook/dummy/core/section'
import { storyHeadline } from '../../../.storybook/dummy/core/various'


storiesOf('Section Video', module)
  .add(
    'Playground',
    () => (
      <>
        <SectionVideoBg content={
          {
            ...storySectionVideoBg({
              options: {
                url: 'https://youtu.be/P1qaAGWUz5U'
              }
            }),
            body: [
              {
                ...storyRow(),
                background: [storyBackground({
                  knob: 'Row',
                  options: {
                    classNames: {
                      values: ['text-white']
                    }
                  }
                })],
                body: [{
                  ...storyColumn({ knob: 'Column', options: { width_general: 'auto', justify: 'flex-end' } }),
                  background: [storyBackground({ knob: 'Column' })],
                  body: [
                    storyHeadline({ count: 1, knob: 'Column' }),
                    storyHeadline({ count: 2, knob: 'Column' })
                  ]
                }]
              }
            ]
          }
        } />
      </>
    )
  )
