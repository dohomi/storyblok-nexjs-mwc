import { storiesOf } from '@storybook/react'
import SectionVideoBg from './SectionVideoBg'
import {
  ColumnStoryblok,
  ParagraphStoryblok,
  RowStoryblok,
  SectionVideoBgStoryblok
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

const props: SectionVideoBgStoryblok = {
  component: 'section_video_bg',
  _uid: '2341',
  url: 'https://youtu.be/P1qaAGWUz5U',
  body: row,
  property:['autoplay']
}

storiesOf('Section Video', module)
  .add(
    'Section Video',
    () => (
      <SectionVideoBg content={props} />
    )
  )
