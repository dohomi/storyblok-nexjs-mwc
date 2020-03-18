import {
  ButtonStoryblok,
  GlobalStoryblok,
  ListSearchAutocompleteStoryblok,
  NavMenuItemStoryblok,
  NavMenuStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../src/typings/generated/components-schema'
import { darkSectionWithColumns } from './section'

const menuItem: NavMenuStoryblok = {
  _uid: '1231231',
  component: 'nav_menu',
  border_radius: '0px',
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
  _uid: '34433',
  component: 'list_search_autocomplete',
  placeholder: 'Search...',
  outlined: true,
  shape: 'square',
  not_found_label: 'We could not find any page..'
}, {
  _uid: '123',
  component: 'button',
  label: 'Button'
}, {
  _uid: '12321',
  component: 'button',
  label: 'Another Button'
}, menuItem] as (ListSearchAutocompleteStoryblok | ButtonStoryblok | NavMenuStoryblok)[]

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


const multiToolbarWithSystemBar = [{

  body: [{
    _uid: '123',
    component: 'toolbar_row_section',
    align_end: true,
    body: toolbarItems
  }] as ToolbarRowSectionStoryblok[]
}, {
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
  multi_toolbar: multiToolbar,
  footer: [darkSectionWithColumns]
}

export const customSettingsWithDrawer: GlobalStoryblok = {
  ...customSettings,
  drawer_body: toolbarItems,
  drawer_class_names:{values: ['bg-primary']}
}

export const customSettingsSystemBar: GlobalStoryblok = {
  ...simpleSettings,
  multi_toolbar: multiToolbarWithSystemBar,
  footer: [darkSectionWithColumns]
}




