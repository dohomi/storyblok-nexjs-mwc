import { storiesOf } from '@storybook/react'
import ImageElement from './ImageElement'
import { ImageStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { storyImage } from '../../../.storybook/dummy/core/various'

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
