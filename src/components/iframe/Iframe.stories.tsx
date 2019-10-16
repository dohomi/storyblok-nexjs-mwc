import { storiesOf } from '@storybook/react'
import Iframe from './Iframe'
import { IframeStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const props: IframeStoryblok = {
  _uid: '2313',
  component: 'iframe',
  url: 'https://www.youtube.com/embed/tgbNymZ7vqY'
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
  .add(
    'Iframe Responsive',
    () => (
      <>
        <h3>16 by 9</h3>
        <Iframe content={{ ...props, responsive_ratio: '16by9' }} />
        <h3>4 by 3</h3>
        <Iframe content={{ ...props, responsive_ratio: '4by3' }} />
      </>
    )
  )
