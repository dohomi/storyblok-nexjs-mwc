import { storiesOf } from '@storybook/react'
import Iframe from './Iframe'
import { IframeAdvancedStoryblok, IframeStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import IframeAdvanced from './IframeAdvanced'

const props: IframeStoryblok = {
  _uid: '2313',
  component: 'iframe',
  url: 'https://www.youtube.com/embed/tgbNymZ7vqY'
}

const advanced: IframeAdvancedStoryblok = {
  _uid: '1231',
  component: 'iframe_advanced',
  url: 'https://mysga.studentsgoabroad.com/?id=cj9sfuvq9onal0116182ztkb0'
}

const advanced2: IframeAdvancedStoryblok = {
  _uid: '1231332',
  component: 'iframe_advanced',
  url: 'https://mysga.studentsgoabroad.com/?id=cj9sl3csjyn7z0160hnehn855&fluid'
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
  .add(
    'Iframe Advanced',
    () => (
      <IframeAdvanced content={advanced}/>
    )
  )
  .add(
    'Iframe With Message',
    () => (
      <IframeAdvanced content={advanced2}/>
    )
  )
