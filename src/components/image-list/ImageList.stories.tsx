import { storiesOf } from '@storybook/react'
import ImageList from './ImageList'
import { ImageListItemStoryblok, ImageListStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { storyImageList, storyImageListItem } from '../../../.storybook/dummy/core/section'

const body: ImageListItemStoryblok[] = [
  {
    _uid: '1',
    component: 'image_list_item',
    source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png',
    label: 'First image'
  },
  {
    _uid: '2',
    component: 'image_list_item',
    source: 'https://a.storyblok.com/f/57008/4541x2202/dc46a24330/bicycles-608747.jpg',
    label: 'Second image'
  },
  {
    _uid: '232',
    component: 'image_list_item',
    source: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png',
    label: 'First image'
  },
  {
    _uid: 'fdldis',
    component: 'image_list_item',
    source: 'https://a.storyblok.com/f/57008/4541x2202/dc46a24330/bicycles-608747.jpg',
    label: 'Second image'
  },
  {
    _uid: 'eferrs',
    component: 'image_list_item',
    source: 'https://a.storyblok.com/f/57008/4541x2202/dc46a24330/bicycles-608747.jpg',
    label: 'Second image'
  }
]

const content: ImageListStoryblok = {
  _uid: '123',
  component: 'image_list',
  body: body
}

const content2: ImageListStoryblok = {
  _uid: '123',
  component: 'image_list',
  body: body,
  enable_lightbox: true
}

const content3: ImageListStoryblok = {
  _uid: '123',
  component: 'image_list',
  body: body,
  enable_lightbox: true,
  text_protection: true
}
const content4: ImageListStoryblok = {
  _uid: '123',
  component: 'image_list',
  body: body,
  enable_lightbox: true
}

storiesOf('Image List', module)
  .add(
    'Image List',
    () => (
      <>
        <ImageList content={content} />
        <h3>Gap of 32</h3>
        <ImageList content={{ ...content, column_gap: '32' }} />
      </>
    )
  )
  .add(
    'Image List Lightbox',
    () => (
      <ImageList content={content2} />
    )
  )
  .add(
    'Image List Protect',
    () => (
      <ImageList content={content3} />
    )
  )
  .add(
    'Image List Ratio',
    () => (
      <>
        <h3>Masonry</h3>
        <ImageList content={{ ...content4, masonry: true }} />
        <h3>Default aspect ratio</h3>
        <ImageList content={content4} />
        <h3>Default 4x3</h3>
        <ImageList content={{ ...content4, aspect_ratio: '4x3' }} />
        <h3>Default 3x4</h3>
        <ImageList content={{ ...content4, aspect_ratio: '3x4' }} />
        <h3>Default 16x9</h3>
        <ImageList content={{ ...content4, aspect_ratio: '16x9' }} />
        <h3>Default 2x3</h3>
        <ImageList content={{ ...content4, aspect_ratio: '2x3' }} />
        <h3>Default 3x2</h3>
        <ImageList content={{ ...content4, aspect_ratio: '3x2' }} />
        <h3>Default 1x1</h3>
        <ImageList content={{ ...content4, aspect_ratio: '1x1' }} />
        <h3>Fit in color:</h3>
        <ImageList content={{ ...content4, aspect_ratio: '3x2', fit_in_color: 'ccc' }} />
        <ImageList content={{ ...content4, aspect_ratio: '2x3', fit_in_color: 'ccc' }} />
      </>
    )
  )
  .add(
    'Playground',
    () => (
      <div>
        <ImageList content={{
          ...storyImageList(),
          body: [
            storyImageListItem({ count: 1 }),
            storyImageListItem({ count: 2 }),
            storyImageListItem({ count: 3 }),
            storyImageListItem({ count: 4 }),
            storyImageListItem({ count: 5 }),
            storyImageListItem({ count: 6 }),
            storyImageListItem({ count: 7 }),
            storyImageListItem({ count: 8 })
          ]
        }} />
      </div>
    )
  )

