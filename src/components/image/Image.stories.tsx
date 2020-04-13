import { storiesOf } from '@storybook/react'
import ImageElement from './ImageElement'
import {
  ColumnStoryblok,
  HeadlineStoryblok,
  ImageStoryblok,
  RowStoryblok
} from '../../typings/generated/components-schema'
import * as React from 'react'
import { storyHeadline, storyImage } from '../../../.storybook/dummy/core/various'
import Section from '../section/Section'
import { storyColumn, storyRow, storySection } from '../../../.storybook/dummy/core/section'

const props: ImageStoryblok = {
  _uid: '123',
  component: 'image',
  source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}

const svg: ImageStoryblok = {
  ...props,
  source: 'https://a.storyblok.com/f/57008/x/7dea868beb/cc_icons-badge_029.svg'
}

storiesOf('Image', module)
  .add(
    'Image',
    () => (
      <div style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <ImageElement content={props} />
        <ImageElement content={{ ...props, property: ['rounded-circle'] }} />
        <ImageElement content={{ ...props, property: ['rounded-0'] }} />
        <ImageElement content={{ ...props, property: ['rounded'] }} />
        <ImageElement content={{ ...props, property: ['img-thumbnail'] }} />
        <ImageElement content={{ ...props, property: ['square'] }} />
        <ImageElement content={{ ...props, property: ['rounded-circle'], height: 64 }} />
        <ImageElement content={{ ...props, property: ['square'], height: 64 }} />
        <ImageElement content={{ ...props, property: ['img-thumbnail'], height: 64 }} />
        <ImageElement content={{ ...props, property: ['rounded'], height: 64 }} />
      </div>
    )
  )
  .add(
    'Image SVG',
    () => (
      <div style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <ImageElement content={{ ...svg, height: 64 }} />
        <ImageElement content={{ ...svg, color: { rgba: '#ccc' }, height: 64 }} />
        <ImageElement content={{ ...svg, color: { rgba: '#eee' }, height: 64 }} />
        <ImageElement content={{ ...svg, color: { rgba: '#ccc' }, height: 64 }} />
        <div className="p-4">
          <h4>Playground:</h4>
          <ImageElement content={storyImage({
            options: {
              source: 'https://a.storyblok.com/f/57008/x/7dea868beb/cc_icons-badge_029.svg'
            }
          })} />

        </div>
      </div>
    )
  )
  .add(
    'Image Focal Point',
    () => {
      const src = 'https://a.storyblok.com/f/69529/4896x2755/95e0b03c15/img_9046.jpg'
      return (
        <div style={{
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{
            height: '150px',
            overflow: 'hidden'
          }}>
            <ImageElement content={storyImage({
              knob: 'Image width/height parent container',
              options: {
                source: src,
                focal_point: '50x0'
              }
            })} />
          </div>
          <br />
          <div style={{
            height: '150px',
            overflow: 'hidden'
          }}>
            <ImageElement content={storyImage({
              knob: 'Same as 1. image different focal',
              options: {
                source: src,
                focal_point: '0x100'
              }
            })} />
          </div>
          <br />
          <div>
            <ImageElement content={storyImage({
              knob: 'Image with height & width',
              options: {
                source: src,
                width: 500,
                height: 150,
                focal_point: '0x100'
              }
            })} />
          </div>
        </div>
      )
    }
  )
  .add(
    'Image in Sections',
    () => (
      <Section content={{
        ...storySection(),
        body: [{
          ...storyRow(),
          body: [{
            ...storyColumn({ count: 1 }),
            width_general: 'auto',
            body: [{
              ...storyHeadline()
            } as HeadlineStoryblok]
          }, {
            ...storyColumn({ count: 2 }),
            width_general: 'auto',
            body: [{
              ...storyImage()
            } as ImageStoryblok]
          }] as ColumnStoryblok[]
        } as RowStoryblok]
      }}>
      </Section>
    )
  )
  .add(
    'Playground',
    () => (
      <div style={{
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <ImageElement content={storyImage()} />
      </div>
    )
  )
