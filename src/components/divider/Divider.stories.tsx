import { storiesOf } from '@storybook/react'
import Divider from './Divider'
import { DividerStoryblok } from '../../typings/generated/components-schema'
import { storyDivider } from '../../../.storybook/dummy/core/various'
import React from 'react'

const props: DividerStoryblok = {
  _uid: '123',
  component: 'divider',
  icon: {
    name: 'clear'
  }
}

const props2: DividerStoryblok = {
  ...props,
  icon: {
    name: 'home'
  },
  icon_size: ['xxx-large'],
  width: 50
}

const props3: DividerStoryblok = {
  ...props,
  icon: {
    name: 'alarm'
  },
  color: {
    rgba: 'rgba(22,333,1212,1)'
  }
}

storiesOf('Divider', module)
  .add(
    'Divider',
    () => (
      <>
        <div>
          <Divider content={storyDivider({ options: { icon: { name: 'account_balance' } } })} />
        </div>
        <div>
          <Divider content={props2} />
        </div>
        <div>
          <Divider content={props3} />
        </div>
        <div>
          <Divider content={storyDivider({
            knob: 'Divider With Presets',
            options: {
              icon: { name: 'shopping_card' },
              size: 32,
              width: 30
            }
          })} />
        </div>
        <div>
          <Divider content={{ ...props3, size: 40, width: 30 }} />
        </div>
        <div>
          <Divider content={{ ...props3, size: 50, width: 30 }} />
        </div>
        <div>
          <Divider content={{ ...props3, size: 60, width: 30 }} />
        </div>
        <div>
          <Divider content={{ ...props3, size: 79, width: 30 }} />
        </div>
      </>
    )
  )
