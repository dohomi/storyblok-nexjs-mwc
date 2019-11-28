import { storiesOf } from '@storybook/react'
import Slider from './Slider'
import * as React from 'react'
import { storySlider } from '../../../.storybook/dummy/core/various'
import { get3ColumnsSection } from '../../../.storybook/dummy/section'

storiesOf('Slider', module)
  .add(
    'Playground',
    () => (
      <Slider content={{
        ...storySlider({
          options: {
            property: ['arrows_dark', 'pagination_dark']
          }
        }), body: [
          get3ColumnsSection({ count: 1 }),
          get3ColumnsSection({ count: 2 }),
          get3ColumnsSection({ count: 3 })
        ]
      }} />
    )
  )
  .add(
    'Dark Playground',
    () => (
      <Slider content={{
        ...storySlider({
          options: {
            background_color: {
              rgba: 'black'
            },
            section_variant: 'light_text'
          }
        }), body: [
          get3ColumnsSection({ count: 1 }),
          get3ColumnsSection({ count: 2 }),
          get3ColumnsSection({ count: 3 })
        ]
      }} />
    )
  )

