import { storiesOf } from '@storybook/react'
import Iframe from './Iframe'
import { IframeStoryblok } from '../../typings/generated/components-schema'

const props: IframeStoryblok = {
  _uid: '2313',
  component: 'iframe',
  url: 'https://www.youtube.com/embed/4jms7cNugXo',

}
storiesOf('Iframe', module)
  .add(
    'Iframe',
    () => (
      <>
        <Iframe content={props} />
      </>
    )
  )
