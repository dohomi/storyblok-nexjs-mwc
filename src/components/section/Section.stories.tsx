import { storiesOf } from '@storybook/react'
import Section from './Section'
import { BackgroundStoryblok, RowStoryblok, SectionStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { columns, row } from '../../../.storybook/dummy/section'


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
      <>
        <Section content={props} />
        <Section content={{ ...columnSection, variant: 'dark' }} />
        <Section content={{ ...columnSection, variant: 'primary' }} />
        <Section content={{ ...columnSection, variant: 'secondary' }} />
      </>
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
