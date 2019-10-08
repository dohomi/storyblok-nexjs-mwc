import { storiesOf } from '@storybook/react'
import SectionParallax from './SectionParallax'
import {
  ColumnStoryblok,
  ParagraphStoryblok,
  ParallaxItemStoryblok,
  RowStoryblok,
  SectionParallaxStoryblok
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

const row: RowStoryblok[] = [{
  body: column,
  _uid: '123',
  component: 'row'
}]

const parallax: ParallaxItemStoryblok[] = [
  {
    _uid: '234123421',
    component: 'parallax_item',
    image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
  }
]

const props: SectionParallaxStoryblok = {
  _uid: '123sd',
  component: 'section_parallax',
  body: row,
  elements: parallax
}

storiesOf('SectionParallax', module)
  .add(
    'Section Parallax',
    () => (
      <SectionParallax content={props} />
    )
  )
