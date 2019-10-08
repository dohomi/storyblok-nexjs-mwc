import { storiesOf } from '@storybook/react'
import Section from './Section'
import {
  BackgroundStoryblok,
  ColumnStoryblok,
  ParagraphStoryblok,
  RowStoryblok,
  SectionStoryblok
} from '../../typings/generated/components-schema'
import * as React from 'react'

const items: ParagraphStoryblok[] = [{
  text: '<h3>Hello World</h3>',
  component: 'paragraph',
  _uid: '789'
}, {
  text: '<h4>Another Paragraph</h4>',
  _uid: '987',
  component: 'paragraph'
}]

const column: ColumnStoryblok[] = [{
  body: items,
  _uid: '321',
  component: 'column'
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
  body: column,
  _uid: '123',
  component: 'row'
}]

const props: SectionStoryblok = {
  _uid: '34234',
  component: 'section',
  body: row
}

const background: SectionStoryblok = {
  ...props,
  background: [{
    _uid: '2131',
    component: 'background',
    image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
  }] as BackgroundStoryblok[]
}

const columnSection: SectionStoryblok = {
  _uid: '2234234',
  component: 'section',
  body: [{
    body: columns,
    _uid: '34241231',
    component: 'row'
  }] as RowStoryblok[]
}

storiesOf('Section', module)
  .add(
    'Section',
    () => (
      <Section content={props} />
    )
  )
  .add(
    'Section with Image',
    () => (
      <Section content={background} />
    )
  )
  .add(
    'Section With Columns',
    () => (
      <Section content={columnSection} />
    )
  )
