import { storiesOf } from '@storybook/react'
import Accordion from './Accordion'
import {
  AccordionItemStoryblok,
  AccordionStoryblok,
  HeadlineStoryblok,
  ParagraphStoryblok
} from '../../typings/generated/components-schema'
import * as React from 'react'

const contentArray: (HeadlineStoryblok | ParagraphStoryblok) [] = [{
  _uid: '532',
  component: 'headline',
  text: 'Some Headline'
}, {
  component: 'paragraph',
  _uid: '123312',
  text: 'Some Paragraph'
}
]
const props: AccordionStoryblok = {
  _uid: '123',
  component: 'accordion',
  body: [
    {
      _uid: '1234',
      component: 'accordion_item',
      title: 'First Headline',
      body: contentArray
    }, {
      _uid: '122311',
      component: 'accordion_item',
      title: 'Second Headline',
      body: contentArray
    }
  ] as AccordionItemStoryblok[]
}

storiesOf('Accordion', module)
  .add(
    'Accordion',
    () => (
      <Accordion content={props} />
    )
  )
