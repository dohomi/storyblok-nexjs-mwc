import { boolean, color, select } from '@storybook/addon-knobs'
import uuid from 'uuid/v4'
import {
  ListSearchAutocompleteStoryblok,
  ToolbarLogoStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../../src/typings/generated/components-schema'
import { CONFIG_STORYBOOK } from '../../components/configStorybook'

export const toolbarRow = (options: Partial<ToolbarRowStoryblok> = {}, knob?: string): ToolbarRowStoryblok => ({
  _uid: uuid(),
  component: 'toolbar_row',
  is_system_bar: boolean('Is System Bar', !!options.is_system_bar, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_ROW),
  justify: select('Justify', {
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly',
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center'
  }, options.justify || undefined, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_ROW) as ToolbarRowStoryblok['justify'],

  background_color: { rgba: color('Background Color', (options.background_color && options.background_color.rgba) || '', knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_ROW) }
})

export const toolbarSection = (options: Partial<ToolbarRowSectionStoryblok> = {}, knob?: string): ToolbarRowSectionStoryblok => ({
  _uid: uuid(),
  component: 'toolbar_row_section',
  align: select('Align', {
    'top': 'flex-start',
    'bottom': 'flex-end',
    'center': 'center'
  }, options.align || '', knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_SECTION) as ToolbarRowSectionStoryblok['align']
})

export const listSearchAutocomplete = (options: Partial<ListSearchAutocompleteStoryblok> = {}, knob?: string): ListSearchAutocompleteStoryblok => ({
  _uid: uuid(),
  component: 'list_search_autocomplete',
  menu_align_right: boolean('Menu Align Right', options.menu_align_right || false, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_SEARCH),
  shape: select('Shape', {
    'rounded': 'rounded',
    'square': 'square'
  }, options.shape || undefined, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_SEARCH)
})

export const toolbarLogo = (_options: Partial<ToolbarLogoStoryblok> = {}, _knobs?: string): ToolbarLogoStoryblok => ({
  _uid: uuid(),
  component: 'toolbar_logo'
})
