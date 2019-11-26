import { StorybookOptionProps } from './storybook_typing'
import {
  CardListItemStoryblok,
  CardListStoryblok,
  ColumnStoryblok,
  RowStoryblok,
  SectionStoryblok
} from '../../../src/typings/generated/components-schema'
import { getLabel, getSentences, getUid, randomIntFromInterval, storyImageOptions, storyImageUrls } from './various'
import { number, optionsKnob, select, text } from '@storybook/addon-knobs'
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

export const storyCardList = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<CardListStoryblok> } = {}): CardListStoryblok => ({
  _uid: getUid(),
  component: 'card_list',
  image_ratio: select(`Card List Image Ratio ${count}`, {
    '16x9': '16x9', '1x1': '1x1', '4x3': '4x3', '3x2': '3x2', Empty: undefined
  }, options.image_ratio || undefined, knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST),
  //@ts-ignore
  variant: optionsKnob(`Card List Variant ${count}`, {
    'over_media': 'over_media',
    'title_top': 'title_top',
    'font_white': 'font_white',
    'raised': 'raised',
    'header_top': 'header_top',
    'text_top_bottom': 'text_top_bottom',
    'text_bottom': 'text_bottom',
    'text_center': 'text_center',
    'text_align_center': 'text_align_center',
    'text_align_right': 'text_align_right'
  }, options.variant || [], { display: 'inline-check' }, knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST),
  column_gap: select(`Card List Image Column Gap ${count}`, {
    '0': '0', '2': '2', '4': '4', '8': '8', '16': '16', '24': '24', '32': '32', Empty: undefined
  }, options.column_gap || undefined, knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST),
  elevation: select(`Card List Elevation ${count}`, {
    '0': '0', '1': '1', '2': '2', '4': '4', '8': '8', '12': '12', '16': '16', '24': '24', Empty: undefined
  }, options.elevation || undefined, knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST),
  column_count: select(`Card List Column Count ${count}`, {
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
    Empty: undefined
  }, options.column_count || undefined, knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST),
  description_max_character: number(`Card List Max Character ${count}`, options.description_max_character || undefined, {}, knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST)
})

export const storyCardListItem = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<CardListItemStoryblok> } = {}): CardListItemStoryblok => ({
  _uid: getUid(),
  component: 'card_list_item',
  image: select(`Card List Image ${count}`, {
    ...storyImageOptions(),
    Empty: undefined
  }, options.image || storyImageUrls[randomIntFromInterval(0, storyImageUrls.length - 1)], knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST_ITEM),
  title: text(`Card List Item Title ${count}`, options.title || getLabel(), knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST_ITEM),
  subtitle: text(`Card List Item Subtitle ${count}`, options.subtitle || getLabel(), knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST_ITEM),
  description: text(`Card List Item Description ${count}`, options.description || getSentences(), knob || CONFIG_STORYBOOK.KNOBS.CARD_LIST_ITEM)

})

