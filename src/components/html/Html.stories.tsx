import { storiesOf } from '@storybook/react'
import Html from './Html'
import { HtmlStoryblok } from '../../typings/generated/components-schema'

const props: HtmlStoryblok = {
  component: 'html',
  _uid: '1231',
  body: '<h3>hello world</h3>'
}

storiesOf('HTML', module)
  .add(
    'HTML',
    () => (
      <>
        <Html content={props} />
      </>
    )
  )
