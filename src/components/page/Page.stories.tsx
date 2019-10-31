import { storiesOf } from '@storybook/react'
import Page from './Page'
import {
  HeadlineStoryblok,
  PageStoryblok,
  ParagraphStoryblok,
  RowStoryblok,
  SectionStoryblok
} from '../../typings/generated/components-schema'
import { columns } from '../../../.storybook/dummy/section'
import * as React from 'react'
import { toggleRightNavigation } from '../../utils/state/actions'


const columnSection: SectionStoryblok = {
  _uid: '2234234',
  component: 'section',
  body: [{
    body: columns,
    _uid: '34241231',
    component: 'row'
  }] as RowStoryblok[]
}

const props: PageStoryblok = {
  _uid: '123',
  component: 'page',
  body: [columnSection]
}

const propsDrawer: PageStoryblok = {
  _uid: '123',
  component: 'page',
  body: [columnSection],
  right_body: [{
    component: 'headline',
    _uid: '12312414',
    text: 'Headline Right'
  }, {
    component: 'paragraph',
    _uid: 'lfkfkf',
    text: 'Some additional content'
  }] as (HeadlineStoryblok | ParagraphStoryblok)[]
}

storiesOf('Page', module)
  .add(
    'Page',
    () => (
      <Page content={props} />
    )
  )
  .add(
    'Page with drawer',
    () => (
      <>
        <button onClick={() => toggleRightNavigation()}>
          open if mobile
        </button>
        <Page content={propsDrawer} />
      </>
    )
  )
