import { storiesOf } from '@storybook/react'
import Header from './Header'
import {
  ButtonStoryblok,
  GlobalStoryblok,
  NavMenuItemStoryblok,
  NavMenuStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../../typings/generated/components-schema'
import * as React from 'react'

const menuItem: NavMenuStoryblok = {
  _uid: '1231231',
  component: 'nav_menu',
  border_radius: 0,
  title: 'Menu',
  body: [{
    _uid: '3243',
    component: 'nav_menu_item',
    label: 'First'
  }, {
    _uid: '34234242',
    component: 'nav_menu_item',
    label: 'Second'
  }] as NavMenuItemStoryblok[]
}

const toolbarItems = [{
  _uid: '123',
  component: 'button',
  label: 'Button'
}, {
  _uid: '12321',
  component: 'button',
  label: 'Another Button'
}, menuItem] as (ButtonStoryblok | NavMenuStoryblok)[]

const simpleSettings: GlobalStoryblok = {
  _uid: '123',
  component: 'global',
  theme_base: 'base',
  website_title: 'Storybook Website Title',
  toolbar: toolbarItems
}

const multiToolbar = [{
  _uid: '23',
  component: 'toolbar_row',
  body: [{
    _uid: '123',
    component: 'toolbar_row_section',
    align_end: true,
    body: toolbarItems
  }] as ToolbarRowSectionStoryblok[]
}] as ToolbarRowStoryblok []

const customSettings: GlobalStoryblok = {
  ...simpleSettings,
  multi_toolbar: multiToolbar
}

storiesOf('Header', module)
  .add(
    'Header Simple',
    () => (
      <>
        <h3>Default</h3>
        <Header settings={simpleSettings} hasFeature={false} />
        <h3>Secondary</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'secondary' }} hasFeature={false} />
        <h3>Dark</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'dark' }} hasFeature={false} />
        <h3>White</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'white' }} hasFeature={false} />
      </>
    )
  )
  .add(
    'Header Custom',
    () => (
      <Header settings={customSettings} hasFeature={false} />
    )
  )
