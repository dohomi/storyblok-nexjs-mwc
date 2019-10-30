import { storiesOf } from '@storybook/react'
import IconMwc from './Icon'
import { IconStoryblok } from '../../typings/generated/components-schema'

const props: IconStoryblok = {
  _uid: '232123',
  component: 'icon',
  name: {
    name: 'home'
  },
  size: 'small'
}

const props1: IconStoryblok = {
  ...props,
  name: {
    name: 'home'
  },
  size: 'large'
}

const props2: IconStoryblok = {
  ...props,
  name: {
    name: 'home'
  },
  size: 'medium',
  class_names: {
    values: ['text-secondary']
  }
}

const props3: IconStoryblok = {
  ...props,
  name: {
    name: 'home'
  },
  size: 'xlarge',
  class_names: {
    values: ['text-primary']
  }
}

storiesOf('Icon', module)
  .add(
    'Icon',
    () => (
      <>
        <IconMwc content={{...props, size: 'xmall'}} />
        <IconMwc content={props} />
        <IconMwc content={props2} />
        <IconMwc content={props1} />
        <IconMwc content={props3} />
        <IconMwc content={{...props, size: 'xxlarge'}} />
        <IconMwc content={{...props, size: 'xxxlarge'}} />
      </>
    )
  )
