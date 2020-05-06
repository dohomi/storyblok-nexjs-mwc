import React from 'react'
import { HeadlineStoryblok } from '../../typings/generated/components-schema'
import { loremIpsum } from 'lorem-ipsum'
import Motion from './Motion'
import { storyMotion } from '../../../.storybook/dummy/core/various'

export default { title: 'Animations' }

const body = [{
  _uid: '21312',
  component: 'headline',
  typography: 'headline4',
  text: loremIpsum({ count: 3, units: 'words' })
}, {
  _uid: '2eqew',
  component: 'headline',
  typography: 'headline3',
  text: loremIpsum({ count: 5, units: 'words' })
}] as (HeadlineStoryblok)[]

export const Overview = () => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ maxWidth: '60vw' }}>
      <h2>Scroll down to see animations in action</h2>
      <h3>Slide:</h3>
      <Motion content={{
        _uid: '1231',
        component: 'motion',
        type: 'slide',
        duration: 1000,
        body
      }} />

      <h3>Collapse:</h3>
      <Motion content={{
        _uid: '21312',
        type: 'collapse',
        component: 'motion',
        duration: 5000,
        body
      }} />
      <h3>Fade:</h3>
      <Motion content={{
        _uid: '21312',
        type: 'fade',
        component: 'motion',
        duration: 5000,
        body
      }} />
      <h3>Grow:</h3>
      <Motion content={{
        _uid: 'aw3',
        type: 'grow',
        component: 'motion',
        duration: 5000,
        body
      }} />
      <h3>Zoom:</h3>
      <Motion content={{
        _uid: 'adsfa',
        type: 'zoom',
        component: 'motion',
        duration: 5000,
        body
      }} />
    </div>
  </div>
)
export const Playground = () => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ maxWidth: '60vw' }}>
      <Motion content={{
        ...storyMotion({options: { duration: 5000 }}),
        body
      }} />
    </div>
  </div>
)
