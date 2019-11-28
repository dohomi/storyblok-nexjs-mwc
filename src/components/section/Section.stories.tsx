import { storiesOf } from '@storybook/react'
import Section from './Section'
import { BackgroundStoryblok, RowStoryblok, SectionStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { columns, columnsWithImage, row, rowWithImage } from '../../../.storybook/dummy/section'
import { storyBackground, storyColumn, storyRow, storySection } from '../../../.storybook/dummy/core/section'
import { storyButton, storyHeadline } from '../../../.storybook/dummy/core/various'


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

const rowItem = {
  body: columns,
  _uid: '34241231',
  component: 'row'
}
const columnSection: SectionStoryblok = {
  _uid: '2234234',
  component: 'section',
  body: [rowItem] as RowStoryblok[]
}

const columnSectionWithImages: SectionStoryblok = {
  _uid: '12312dfd',
  component: 'section',
  body: [{
    body: columnsWithImage,
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
    'Section with styles',
    () => (
      <>
        <Section content={{
          ...background,
          property: ['is_full_height'],
          background_style: 'fixed_image',
          variant: 'light_text'
        }} />
        <h2>&nbsp;</h2>
        <Section content={{
          ...background,
          property: ['is_full_height'],
          background: [{
            background_color: {
              rgba: 'rgba(0,0,0,0.2)'
            },
            border_color: {
              rgba: 'red'
            },
            border_size: 3,
            border_radius: '24px 4px',
            elevation: 12
          }] as BackgroundStoryblok[]
        }} />
        <h2>&nbsp;</h2>
        <Section content={{ ...background, background_style: 'fixed_cover' }} />
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
    'Section row with image',
    () => (
      <>
        <Section content={{
          _uid: '123123',
          component: 'section',
          body: rowWithImage
        }} />
        <Section content={columnSection} />
        <Section content={{
          _uid: '123123',
          component: 'section',
          body: rowWithImage
        }} />
      </>
    )
  )
  .add(
    'Section with column image',
    () => (
      <>
        <Section content={columnSectionWithImages} />
      </>
    )
  )
  .add(
    'Section alignments',
    () => (
      <>
        <h1>Justify</h1>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'secondary',
          body: [{ ...rowItem, justify: 'flex-start' }] as RowStoryblok[]
        }} />
        <h2>end</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'dark',
          body: [{ ...rowItem, justify: 'flex-end' }] as RowStoryblok[]
        }} />
        <h2>space between</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'primary',
          body: [{ ...rowItem, justify: 'space-between' }] as RowStoryblok[]
        }} />
        <h2>space evenly</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'primary',
          body: [{ ...rowItem, justify: 'space-evenly' }] as RowStoryblok[]
        }} />
        <h2>space around</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'secondary',
          body: [{ ...rowItem, justify: 'space-around' }] as RowStoryblok[]
        }} />
        <h1>Alignment</h1>
        <h2>start</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'dark',
          body: [{ ...rowItem, align_content: 'flex-start' }] as RowStoryblok[]
        }} />
        <h2>end</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'primary',
          body: [{ ...rowItem, align_content: 'flex-end' }] as RowStoryblok[]
        }} />
        <h2>center</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'secondary',
          body: [{ ...rowItem, align_content: 'center' }] as RowStoryblok[]
        }} />
        <h2>space between</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'dark',
          body: [{ ...rowItem, align_content: 'space-between' }] as RowStoryblok[]
        }} />
        <h2>space around</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'secondary',
          body: [{ ...rowItem, align_content: 'space-around' }] as RowStoryblok[]
        }} />
        <h2>stretch</h2>
        <Section content={{
          ...columnSection,
          property: ['is_full_height'],
          variant: 'primary',
          body: [{ ...rowItem, align_content: 'stretch' }] as RowStoryblok[]
        }} />
      </>
    )
  )
  .add(
    'Playground',
    () => (
      <div>
        <Section content={
          {
            ...storySection(),
            background: [storyBackground({ knob: 'Section' })],
            body: [
              {
                ...storyRow({ options: { justify: 'center' } }),
                background: [storyBackground({ knob: 'Row' })],
                body: [{
                  ...storyColumn({ knob: 'Column 1', options: { width_general: 'auto' } }),
                  background: [storyBackground({ knob: 'Column 1' })],
                  body: [
                    storyHeadline({ count: 1, knob: 'Column 1' }),
                    storyHeadline({ count: 2, knob: 'Column 1' }),
                    storyButton({ knob: 'Column 1' })
                  ]
                }, {
                  ...storyColumn({ knob: 'Column 2', options: { width_general: 'auto' } }),
                  background: [storyBackground({ knob: 'Column 2' })],
                  body: [
                    storyHeadline({ count: 1, knob: 'Column 2' }),
                    storyHeadline({ count: 2, knob: 'Column 2' }),
                    storyButton({ knob: 'Column 2' })
                  ]
                }]
              }
            ]
          }
        } />
      </div>
    )
  )
