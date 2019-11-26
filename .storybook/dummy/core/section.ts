import { StorybookOptionProps } from './storybook_typing'
import { ColumnStoryblok, RowStoryblok, SectionStoryblok } from '../../../src/typings/generated/components-schema'
import { getUid } from './various'
import { optionsKnob, select, text } from '@storybook/addon-knobs'
import { CONFIG_STORYBOOK } from '../../components/configStorybook'

export const storySection = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<SectionStoryblok> } = {}): SectionStoryblok => ({
  component: 'section',
  _uid: getUid(),
  variant: select(`Section Variant ${count}`, {
    primary: 'primary',
    light: 'light',
    secondary: 'secondary',
    dark: 'dark',
    dark_text: 'dark_text',
    light_text: 'light_text',
    transparent: 'transparent',
    Empty: undefined
  }, options.variant || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  max_width: select(`Section Variant ${count}`, {
    xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', Empty: undefined
  }, options.max_width || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  // @ts-ignore
  property: optionsKnob(`Section Property ${count}`, { is_full_height: 'is_full_height' } as unknown as SectionStoryblok['property'], options.property || [], { display: 'inline-check' }, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  padding: text(`Section Padding ${count}`, options.padding || '', knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  background_style: select(`Section Background Style ${count}`, {
    fixed_image: 'fixed_image',
    fixed_cover: 'fixed_cover',
    Empty: undefined
  }, options.background_style || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION)
})

export const storyRow = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<RowStoryblok> } = {}): RowStoryblok => ({
  component: 'row',
  _uid: getUid(),
  justify: select(`Row Justify ${count}`, {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly',
    Empty: undefined
  }, options.justify || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  align_items: select(`Row Align Items ${count}`, {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    'baseline': 'baseline',
    'stretch': 'stretch',
    Empty: undefined
  }, options.align_items || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  align_content: select(`Row Align Content ${count}`, {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'stretch': 'stretch',
    Empty: undefined
  }, options.align_content || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  spacing: select(`Row Spacing ${count}`, {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    Empty: undefined
  }, options.spacing || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  direction: select(`Row Direction ${count}`, {
    'row': 'row', 'column': 'column', 'row-reverse': 'row-reverse', 'column-reverse': 'column-reverse',
    Empty: undefined
  }, options.direction || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION)
})

export const storyColumn = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ColumnStoryblok> } = {}): ColumnStoryblok => ({
  component: 'column',
  _uid: getUid(),
  width_general: select(`Row Width General ${count}`, {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    '11': '11',
    '12': '12',
    'true': 'true',
    'false': 'false',
    'auto': 'auto',
    Empty: undefined
  }, options.width_general || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  width_tablet: select(`Row Width General ${count}`, {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    'true': 'true',
    'false': 'false',
    'auto': 'auto',
    Empty: undefined
  }, options.width_tablet || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  width_phone: select(`Row Width General ${count}`, {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    'true': 'true',
    'false': 'false',
    'auto': 'auto',
    Empty: undefined
  }, options.width_phone || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),

  justify: select(`Column Justify ${count}`, {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly',
    Empty: undefined
  }, options.justify || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  align_items: select(`Column Align Items ${count}`, {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    'baseline': 'baseline',
    'stretch': 'stretch',
    Empty: undefined
  }, options.align_items || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION),
  align_content: select(`Column Align Content ${count}`, {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'stretch': 'stretch',
    Empty: undefined
  }, options.align_content || undefined, knob || CONFIG_STORYBOOK.KNOBS.SECTION)
})
