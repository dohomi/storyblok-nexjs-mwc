import { storiesOf } from '@storybook/react'
import Page from './Page'
import { PageStoryblok } from '../../typings/generated/components-schema'

const props: PageStoryblok = {
  _uid: '123',
  component: 'page'

}

storiesOf('Page', module)
  .add(
    'Page',
    () => (
      <Page content={props} />
    )
  )
