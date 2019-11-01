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

const backgroundItem = {
  _uid: '2131',
  component: 'background',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}
const background: SectionStoryblok = {
  ...props,
  background: [backgroundItem] as BackgroundStoryblok[]
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
        <Section content={{ ...columnSection, variant: 'light' }} />
        <Section content={{ ...columnSection, variant: 'dark_text' }} />
        <Section content={{ ...columnSection, variant: 'light_text' }} />
      </>
    )
  )
  .add(
    'Section with Styles',
    () => (
      <>
        <Section content={{
          ...background,
          background: [{
            background_color: {
              rgba: 'rgba(0,0,0,0.2)'
            },
            border_color: {
              rgba: 'rgba(0,0,0,0.5)'
            },
            border_size: 3,
            border_radius: '12px',
            border_style: 'dotted',
            elevation: 12
          }] as BackgroundStoryblok[]
        }} />
        <Section content={background} />
        <Section content={{
          ...background,
          background: [{
            background_color: {
              rgba: 'rgba(0,0,0,0.2)'
            },
            border_color: {
              rgba: 'rgba(0,0,0,1)'
            },
            border_size: 3,
            border_radius: '12px',
            border_style: 'dotted'
          }] as BackgroundStoryblok[]
        }} />
      </>
    )
  )
  .add(
    'Section With Image',
    () => (
      <Section content={background} />
    )
  )
