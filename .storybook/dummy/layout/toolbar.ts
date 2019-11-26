import { boolean, color, select } from '@storybook/addon-knobs'
import {
  ListSearchAutocompleteStoryblok,
  ToolbarLogoStoryblok,
  ToolbarRowSectionStoryblok,
  ToolbarRowStoryblok
} from '../../../src/typings/generated/components-schema'
import { CONFIG_STORYBOOK } from '../../components/configStorybook'
import { StorybookOptionProps } from '../core/storybook_typing'
import { getUid } from '../core/various'


export const toolbarRow = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ToolbarRowStoryblok> }): ToolbarRowStoryblok => ({
  _uid: getUid(),
  component: 'toolbar_row',
  is_system_bar: boolean(`Is System Bar ${count}`, !!options.is_system_bar, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_ROW),
  justify: select(`Justify ${count}`, {
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly',
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    None: null
  }, options.justify || undefined, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_ROW) as ToolbarRowStoryblok['justify'],

  background_color: { rgba: color(`Background Color ${count}`, (options.background_color && options.background_color.rgba) || '', knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_ROW) }
})

export const toolbarSection = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ToolbarRowSectionStoryblok> }): ToolbarRowSectionStoryblok => ({
  _uid: getUid(),
  component: 'toolbar_row_section',
  align: select(`Align ${count}`, {
    'top': 'flex-start',
    'bottom': 'flex-end',
    'center': 'center',
    None: null
  }, options.align || undefined, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_SECTION) as ToolbarRowSectionStoryblok['align']
})

export const listSearchAutocomplete = (options: Partial<ListSearchAutocompleteStoryblok> = {}, knob?: string): ListSearchAutocompleteStoryblok => ({
  _uid: getUid(),
  component: 'list_search_autocomplete',
  menu_align_right: boolean('Menu Align Right', options.menu_align_right || false, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_SEARCH),
  shape: select('Shape', {
    'rounded': 'rounded',
    'square': 'square',
    Null: undefined
  }, options.shape || undefined, knob || CONFIG_STORYBOOK.KNOBS.TOOLBAR_SEARCH)
})

export const toolbarLogo = (_options: Partial<ToolbarLogoStoryblok> = {}, _knobs?: string): ToolbarLogoStoryblok => ({
  _uid: getUid(),
  component: 'toolbar_logo'
})
