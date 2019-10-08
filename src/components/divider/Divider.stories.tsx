import { storiesOf } from '@storybook/react'
import Divider from './Divider'
import { DividerStoryblok } from '../../typings/generated/components-schema'

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
  icon_size: 'xxx-large',
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
          <Divider content={props} />
        </div>
        <div>
          <Divider content={props2} />
        </div>
        <div>
          <Divider content={props3} />
        </div>
      </>
    )
  )
