import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Page from '../page/Page'
import { get3ColumnsSection } from '../../../.storybook/dummy/section'
import {
  storyBackground,
  storyColumn,
  storyParallaxItem,
  storyRow,
  storySectionParallax
} from '../../../.storybook/dummy/core/section'
import { storyHeadline } from '../../../.storybook/dummy/core/various'


storiesOf('Section Parallax', module)
  .add(
    'Section Parallax',
    () => (
      <Page content={{
        _uid: 'page',
        component: 'page',
        body: [{
          ...storySectionParallax(),
          body: [
            {
              ...storyRow({
                knob: 'Content Parallax',
                options: {
                  justify: 'center',
                  align_content: 'flex-end'
                }
              }),
              background: [storyBackground({
                knob: 'Content Parallax', options: {
                  classNames: { values: ['text-center', 'text-white'] }
                }
              })],
              body: [{
                ...storyColumn({ knob: 'Content Parallax' }),
                body: [
                  storyHeadline({ knob: 'Content Parallax', options: { typography: 'headline2' } })
                ]
              }]
            }

          ],
          elements: [
            storyParallaxItem({
              options: {
                image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
              }
            })
          ]
        },
          get3ColumnsSection({ knob: '3 Column Section', count: 1 }),
          get3ColumnsSection({ knob: '3 Column Section', count: 2 }),
          get3ColumnsSection({ knob: '3 Column Section', count: 3 })
        ]
      }} />
    )
  )
