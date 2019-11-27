import { storiesOf } from '@storybook/react'
import Slider from './Slider'
import {
  ColumnStoryblok,
  ParagraphStoryblok,
  RowStoryblok,
  SectionStoryblok,
  SliderStoryblok
} from '../../typings/generated/components-schema'
import * as React from 'react'
import { storySlider } from '../../../.storybook/dummy/core/various'

const items: ParagraphStoryblok[] = [{
  text: '<h3>Hello World</h3>',
  component: 'paragraph',
  _uid: '789'
}, {
  text: '<h4>Another Paragraph</h4>',
  _uid: '987',
  component: 'paragraph'
}]

const columns: ColumnStoryblok[] = [{
  body: items,
  _uid: '23424324432',
  component: 'column',
  width_general: '4'
}, {
  body: items,
  _uid: '252435131',
  component: 'column',
  width_general: '4'
}, {
  body: items,
  _uid: '341531545',
  component: 'column',
  width_general: '4'
}]


const row: RowStoryblok[] = [{
  body: columns,
  _uid: '123',
  component: 'row'
}]
const section1: SectionStoryblok = {
  _uid: '123123',
  component: 'section',
  body: row
}
const section2: SectionStoryblok = {
  _uid: '324234',
  component: 'section',
  body: row
}
const section3: SectionStoryblok = {
  _uid: '1312321',
  component: 'section',
  body: row
}
const body = [section1, section2, section3]

const props: SliderStoryblok = {
  component: 'slider',
  _uid: '123',
  body,
  property: ['arrows_dark', 'pagination_dark']
}

const props2: SliderStoryblok = {
  component: 'slider',
  _uid: '656565',
  body,
  background_color: {
    rgba: 'black'
  },
  section_variant: 'light_text'
}

storiesOf('Slider', module)
  .add(
    'Playground',
    () => (
      <Slider content={{
        ...storySlider({
          options: {
            property: ['arrows_dark', 'pagination_dark']
          }
        }), body: props.body
      }} />
    )
  )
  .add(
    'Dark Playground',
    () => (
      <Slider content={{
        ...storySlider({
          options: {
            background_color: {
              rgba: 'black'
            },
            section_variant: 'light_text'
          }
        }), body: props2.body
      }} />
    )
  )

