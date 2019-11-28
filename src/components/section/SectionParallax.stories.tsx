import { storiesOf } from '@storybook/react'
import {
  ColumnStoryblok,
  ParagraphStoryblok,
  ParallaxItemStoryblok,
  RowStoryblok,
  SectionParallaxStoryblok
} from '../../typings/generated/components-schema'
import * as React from 'react'
import Page from '../page/Page'
import { get3ColumnsSection } from '../../../.storybook/dummy/section'
import { storyParallaxItem, storySectionParallax } from '../../../.storybook/dummy/core/section'
import { storyHeadline } from '../../../.storybook/dummy/core/various'

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

storiesOf('Section Parallax', module)
  .add(
    'Section Parallax',
    () => (
      <Page content={{
        _uid: 'page',
        component: 'page',
        body: [{
          ...storySectionParallax(),
          body: [
            storyHeadline()
          ],
          elements: [
            storyParallaxItem({
              options: {
                image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
              }
            })
          ]
        },
          get3ColumnsSection({ knob: '3 Column Section 1' }),
          get3ColumnsSection({ knob: '3 Column Section 2' }),
          get3ColumnsSection({ knob: '3 Column Section 3' })
        ]
      }} />
    )
  )
