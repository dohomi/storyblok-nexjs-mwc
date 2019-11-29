import { storiesOf } from '@storybook/react'
import IconMwc from './Icon'
import { storyIcon } from '../../../.storybook/dummy/core/various'
import IconMdi from './IconMdi'

storiesOf('Icon', module)
  .add(
    'Icon',
    () => (
      <>
        <IconMwc content={storyIcon({
          count: 1, options: {
            name: {
              name: 'home'
            },
            size: 'xmall'
          }
        })} />
        <IconMwc content={storyIcon({
          count: 2, options: {
            name: {
              name: 'home'
            },
            size: 'small'
          }
        })} />
        <IconMwc content={storyIcon({
          count: 3, options: {
            name: {
              name: 'home'
            },
            size: 'medium'
          }
        })} />
        <IconMwc content={storyIcon({
          count: 4, options: {
            name: {
              name: 'home'
            },
            size: 'large',
            class_names: {
              values: ['text-primary']
            }
          }
        })} />
        <IconMwc content={storyIcon({
          count: 5, options: {
            name: {
              name: 'home'
            },
            size: 'xxlarge',
            class_names: {
              values: ['text-danger']
            }
          }
        })} />
        <IconMwc content={storyIcon({
          count: 6, options: {
            name: {
              name: 'home'
            },
            size: 'xxxlarge'
          }
        })} />
      </>
    )
  )
  .add(
    'Icon MDI',
    () => (
      <div className="p-5">
        <IconMdi />
      </div>
    )
  )
