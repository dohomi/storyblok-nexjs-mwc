import { storiesOf } from '@storybook/react'
import Page from './Page'
import {
  GlobalStoryblok,
  HeadlineStoryblok,
  PageStoryblok,
  ParagraphStoryblok,
  RowStoryblok,
  SectionStoryblok
} from '../../typings/generated/components-schema'
import { columns } from '../../../.storybook/dummy/section'
import * as React from 'react'
import { toggleRightNavigation } from '../../utils/state/actions'
import { customSettings } from '../../../.storybook/dummy/toolbar'
import Layout from '../layout/Layout'


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
  body: [columnSection, { ...columnSection, _uid: '12321311' }],
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

storiesOf('Layout', module)
  .add(
    'Simple Page',
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
  .add(
    'Playground',
    // @ts-ignore
    ({ settings }: { settings: GlobalStoryblok }) => {
      return (
        <>
          <Layout settings={{
            ...settings,
            multi_toolbar: customSettings.multi_toolbar,
            footer: customSettings.footer,

          }}
                  hasFeature={false}
                  hasRightDrawer={true}>
            <Page content={propsDrawer} />
          </Layout>
        </>
      )
    }
  )
