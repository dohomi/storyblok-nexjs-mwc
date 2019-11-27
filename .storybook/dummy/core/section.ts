import { StorybookOptionProps } from './storybook_typing'
import {
  CardListItemStoryblok,
  CardListStoryblok,
  ColumnStoryblok, FlexRowStoryblok,
  RowStoryblok,
  SectionStoryblok
} from '../../../src/typings/generated/components-schema'
import { getLabel, getSentences, randomIntFromInterval, storyImageUrls } from './various'
import getKnobComponents from '../helpers/getKnobComponent'


export const storySection = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<SectionStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'section',
    options,
    knob,
    count
  }) as SectionStoryblok
}

export const storyRow = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<RowStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'row',
    options,
    knob,
    count
  }) as RowStoryblok
}

export const storyColumn = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ColumnStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'column',
    options,
    knob,
    count
  }) as ColumnStoryblok
}

export const storyCardList = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<CardListStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'card_list',
    options,
    knob,
    count
  }) as CardListStoryblok
}

export const storyCardListItem = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<CardListItemStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'card_list_item',
    options: {
      image: storyImageUrls[randomIntFromInterval(0, storyImageUrls.length - 1)],
      title: getLabel(),
      subtitle: getLabel(),
      description: getSentences(),
      ...options
    },
    knob,
    count
  }) as CardListItemStoryblok
}

export const storyFlexRow = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<FlexRowStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'flex_row',
    options,
    knob,
    count
  }) as FlexRowStoryblok
}
