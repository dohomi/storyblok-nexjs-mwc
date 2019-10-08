import { storiesOf } from '@storybook/react'
import ImageElement from './ImageElement'
import { ImageStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const props: ImageStoryblok = {
  _uid: '123',
  component: 'image',
  source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}

const props2: ImageStoryblok = {
  ...props,
  property: ['rounded-circle']
}

const svg: ImageStoryblok = {
  ...props,
  source: 'https://a.storyblok.com/f/57008/x/7dea868beb/cc_icons-badge_029.svg'
}

storiesOf('Image', module)
  .add(
    'Image',
    () => (
      <ImageElement content={props} />
    )
  )
  .add(
    'Image Rounded Circle',
    () => (
      <ImageElement content={props2} />
    )
  )
  .add(
    'Image SVG',
    () =>(
      <ImageElement content={svg} />
    )
  )
