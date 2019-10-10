import {
  ButtonStoryblok,
  GlobalStoryblok,
  NavMenuItemStoryblok,
  NavMenuStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../src/typings/generated/components-schema'

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

export const simpleSettings: GlobalStoryblok = {
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

export const customSettings: GlobalStoryblok = {
  ...simpleSettings,
  multi_toolbar: multiToolbar
}
