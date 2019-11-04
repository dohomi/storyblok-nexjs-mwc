import { storiesOf } from '@storybook/react'
import Tabs from './Tabs'
import {
  HeadlineStoryblok,
  ParagraphStoryblok,
  TabsItemStoryblok,
  TabsStoryblok
} from '../../typings/generated/components-schema'

const tabBodyItem = [{
  _uid: '123',
  component: 'headline',
  text: 'Some Body Item'
}, {
  _uid: '2323',
  component: 'paragraph',
  text: 'Some Body Paragraph'
}] as (ParagraphStoryblok | HeadlineStoryblok)[]

const tabBody: TabsItemStoryblok[] = [{
  _uid: '1231',
  component: 'tabs_item',
  title: 'First Tab',
  body: tabBodyItem
}, {
  _uid: '123132',
  component: 'tabs_item',
  title: 'Second Tab',
  body: tabBodyItem
}, {
  _uid: '53453453',
  component: 'tabs_item',
  title: 'Third Tab',
  body: tabBodyItem
}]

const props: TabsStoryblok = {
  _uid: '123',
  component: 'tabs',
  body: tabBody
}

const withIcons = tabBody.map(i => ({ ...i, icon: { name: 'home' } })) as TabsItemStoryblok[]
const icons: TabsStoryblok = {
  _uid: '123',
  component: 'tabs',
  body: withIcons
}

const vertical: TabsStoryblok = {
  _uid: '123',
  component: 'tabs',
  vertical_tabs: true,
  body: withIcons
}

storiesOf('Tabs', module)
  .add(
    'Tabs',
    () => (
      <>
        <Tabs content={props} />
        <Tabs content={{ ...props, variant: 'scrollable' }} />
        <Tabs content={{ ...props, variant: 'standard' }} />
        <Tabs content={{ ...props, variant: 'standard', centered: true }} />
      </>
    )
  )
  .add(
    'Tabs with icon',
    () => (
      <>
        <Tabs content={icons} />
        <Tabs content={{ ...icons, variant: 'scrollable' }} />
        <Tabs content={{ ...icons, variant: 'standard' }} />
        <Tabs content={{ ...icons, variant: 'standard', centered: true }} />
      </>
    )
  )
  .add(
    'Tabs vertical',
    () => (
      <Tabs content={vertical} />
    )
  )
