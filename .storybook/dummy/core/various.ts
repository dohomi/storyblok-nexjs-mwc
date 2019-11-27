import { StorybookOptionProps } from './storybook_typing'
import {
  AccordionItemStoryblok,
  AccordionStoryblok,
  ButtonListStoryblok,
  ButtonStoryblok,
  HeadlineStoryblok,
  NavMenuItemStoryblok,
  NavMenuStoryblok,
  RichTextEditorStoryblok
} from '../../../src/typings/generated/components-schema'
import uuid from 'uuid/v4'
import { text } from '@storybook/addon-knobs'
import { LoremIpsum } from 'lorem-ipsum'
import getKnobComponents, { camelizeString } from '../helpers/getKnobComponent'

const lorem = new LoremIpsum()

export const getUid = () => uuid()

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

export function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


export const storyImageUrls = ['https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png',
  'https://a.storyblok.com/f/69529/3000x1688/50d31aa864/img_0766.jpg',
  'https://a.storyblok.com/f/69529/4896x2755/95e0b03c15/img_9046.jpg',
  'https://a.storyblok.com/f/69529/6000x4000/3c29c3c039/img_5956.jpg']

export const storyImageOptions = () => {
  const obj = {
    'Select or drop a public url': undefined
  }
  storyImageUrls.forEach((url, i) => {
    obj[url + '_' + i] = url
  })
  return obj
}

export const getLabel = (words: number = 1) => capitalize(lorem.generateWords(words))
export const getSentences = (count: number = 2) => lorem.generateSentences(count)
export const getParagraphs = (paragraphs: number = 2) => lorem.generateParagraphs(paragraphs)
export const getOptions = (object: any) => {
  const obj = {}
  Object.keys(object).forEach(k => {
    obj[k] = object[k]
  })
  return obj
}

export const iconOptions = {
  'home': 'home',
  'app': 'app',
  'account_balance': 'account_balance',
  'add_shopping_cart': 'add_shopping_cart',
  'calendar_today': 'calendar_today',
  'menu': 'menu',
  'expand_more': 'expand_more',
  'expand_less': 'expand_less',
  Empty: undefined
}
export const storyButton = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ButtonStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'button',
    options: {
      label: getLabel(),
      ...options
    },
    knob,
    count
  })
}

export const storyMenu = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<NavMenuStoryblok> } = {}) => {
  return getKnobComponents({
    componentName: 'nav_menu',
    options: {
      title: getLabel(),
      ...options
    },
    knob,
    count
  }) as NavMenuStoryblok
}

export const storyMenuItem = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<NavMenuItemStoryblok> } = {}): NavMenuItemStoryblok => {
  return getKnobComponents({
    componentName: 'nav_menu_item',
    options: {
      label: getLabel(3),
      ...options
    },
    knob,
    count
  }) as NavMenuItemStoryblok
}

export const storyHeadline = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<HeadlineStoryblok> } = {}): HeadlineStoryblok => {
  return getKnobComponents({
    componentName: 'headline',
    options: {
      text: getLabel(2),
      ...options
    },
    knob,
    count
  }) as HeadlineStoryblok
}

export const storyParagraph = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<RichTextEditorStoryblok> } = {}): RichTextEditorStoryblok => {
  return {
    body: {
      content: [{
        type: 'paragraph',
        content: [{
          type: 'text',
          text: text(`Paragraph Text ${count}`, options.text || getParagraphs(), knob || camelizeString('rich_text_editor'))
        }]
      }]
    },
    ...getKnobComponents({
      componentName: 'rich_text_editor',
      options: {
        text: getLabel(2),
        ...options
      },
      knob,
      count
    })
  } as RichTextEditorStoryblok
}

export const storyAccordion = ({ options, knob, count }: StorybookOptionProps & { options?: Partial<AccordionStoryblok> } = {}): AccordionStoryblok => {
  return getKnobComponents({
    componentName: 'accordion',
    options,
    knob,
    count
  }) as AccordionStoryblok
}

export const storyAccordionItem = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<AccordionItemStoryblok> } = {}): AccordionItemStoryblok => {
  return getKnobComponents({
    componentName: 'accordion_item',
    options: {
      title: getLabel(4),
      ...options
    },
    knob,
    count
  }) as AccordionItemStoryblok
}

export const storyButtonList = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ButtonListStoryblok> } = {}): ButtonListStoryblok => {
  return getKnobComponents({
    componentName: 'button_list',
    options,
    knob,
    count
  }) as ButtonListStoryblok
}
