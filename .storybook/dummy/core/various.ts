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
import { CONFIG_STORYBOOK } from '../../components/configStorybook'
import { color, optionsKnob, select, text } from '@storybook/addon-knobs'
import { LoremIpsum } from 'lorem-ipsum'

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
  const obj = {}
  storyImageUrls.forEach((url, i) => {
    obj[`Image ${i + 1}`] = url
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
export const storyButton = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ButtonStoryblok> } = {}): ButtonStoryblok => ({
  _uid: getUid(),
  component: 'button',
  label: text(`Button Label ${count}`, options.label || getLabel(), knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  size: select(`Button Size ${count}`, {
    'dense': 'dense',
    'lm-button-large': 'lm-button-large',
    'lm-button-xlarge': 'lm-button-xlarge',
    Empty: undefined
  }, options.size || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  variant: select(`Button Variant ${count}`, {
    raised: 'raised', outlined: 'outlined', fab: 'fab', unelevated: 'unelevated', Empty: undefined
  }, options.variant || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  color: select(`Button Color ${count}`, {
    secondary: 'secondary',
    secondary_text: 'secondary_text',
    primary: 'primary',
    primary_text: 'primary_text',
    dark: 'dark',
    light: 'light',
    Empty: undefined
  }, options.color || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  corners: select(`Button Corners ${count}`, {
    'lm-button-shaped': 'lm-button-shaped', 'lm-button-square': 'lm-button-square', Null: undefined
  }, options.corners || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  properties: optionsKnob(`Button Properties ${count}`, {
    'disable-ripple': 'disable-ripple', 'disable-shadow': 'disable-shadow'
  }, options.properties || undefined, { display: 'inline-check' }, knob || CONFIG_STORYBOOK.KNOBS.BUTTON) as ButtonStoryblok['properties'],
  icon: {
    name: select(`Button Icon ${count}`, iconOptions, (options.icon && options.icon.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON)
  },
  trailing_icon: {
    name: select(`Button Trailing Icon ${count}`, iconOptions, (options.icon && options.icon.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON)
  },
  font: select(`Button Font ${count}`, {
    alt1: 'alt1', alt2: 'alt2', alt3: 'alt3', alt4: 'alt4', Empty: undefined
  }, (options.font) || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON)
})

export const storyMenu = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<NavMenuStoryblok> } = {}): NavMenuStoryblok => ({
  _uid: getUid(),
  component: 'nav_menu',
  title: text(`Menu Title ${count}`, options.title || getLabel(), knob || CONFIG_STORYBOOK.KNOBS.MENU),
  alignment: select(`Menu Alignment ${count}`, {
    bottomEnd: 'bottomEnd',
    bottomStart: 'bottomStart',
    Empty: undefined
  }, options.alignment || undefined, knob || CONFIG_STORYBOOK.KNOBS.MENU),
  icon: {
    name: select(`Menu Icon ${count}`, iconOptions, (options.icon && options.icon.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.MENU)
  },
  icon_collapse: {
    name: select(`Menu Icon Collapse ${count}`, iconOptions, (options.icon_collapse && options.icon_collapse.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.MENU)
  },
  border_radius: text(`Menu Border Radius ${count}`, options.border_radius || '', knob || CONFIG_STORYBOOK.KNOBS.MENU)
})

export const storyMenuItem = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<NavMenuItemStoryblok> } = {}): NavMenuItemStoryblok => ({
  _uid: getUid(),
  component: 'nav_menu_item',
  label: text(`Menu Item Label ${count}`, options.label || getLabel(3), knob || CONFIG_STORYBOOK.KNOBS.MENU)
})

export const storyHeadline = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<HeadlineStoryblok> } = {}): HeadlineStoryblok => ({
  _uid: getUid(),
  component: 'headline',
  text: text(`Headline Text ${count}`, options.text || getLabel(2), knob || CONFIG_STORYBOOK.KNOBS.HEADLINE),
  typography: select(`Headline Typography ${count}`, {
    headline1: 'headline1',
    headline2: 'headline2',
    headline3: 'headline3',
    headline4: 'headline4',
    headline5: 'headline6',
    headline6: 'headline6',
    body1: 'body1',
    body2: 'body2',
    subtitle1: 'subtitle1',
    subtitle2: 'subtitle2',
    overline: 'overline',
    caption: 'caption',
    Empty: undefined
  }, options.typography || undefined, knob || CONFIG_STORYBOOK.KNOBS.HEADLINE),
  color: select(`Headline Color ${count}`, {
    primary: 'primary',
    secondeary: 'secondary',
    textPrimary: 'textPrimary',
    textSecondary: 'textSecondary',
    error: 'error',
    Empty: undefined
  }, (options.color) || undefined, knob || CONFIG_STORYBOOK.KNOBS.HEADLINE),
  custom_color: { rgba: color(`Headline Custom Color`, (options.custom_color && options.custom_color.rgba) || '', knob || CONFIG_STORYBOOK.KNOBS.HEADLINE) },
  line_height: text(`Headline Line Height ${count}`, options.line_height || '', knob || CONFIG_STORYBOOK.KNOBS.HEADLINE),
  align: select(`Headline Align ${count}`, {
    'left': 'left',
    'center': 'center',
    'right': 'right',
    'justify': 'justify',
    Empty: undefined
  }, options.align || undefined, knob || CONFIG_STORYBOOK.KNOBS.HEADLINE),
  font: select(`Headline Font ${count}`, {
    alt1: 'alt1', alt2: 'alt2', alt3: 'alt3', alt4: 'alt4', Empty: undefined
  }, (options.font) || undefined, knob || CONFIG_STORYBOOK.KNOBS.HEADLINE),
  font_size: text(`Headline Font Size ${count}`, options.font_size || '', knob || CONFIG_STORYBOOK.KNOBS.HEADLINE)
})

export const storyParagraph = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<RichTextEditorStoryblok> } = {}): RichTextEditorStoryblok => ({
  _uid: getUid(),
  component: 'rich_text_editor',
  body: {
    content: [{
      type: 'paragraph',
      content: [{
        type: 'text',
        text: text(`Paragraph Text ${count}`, options.text || getParagraphs(), knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH)
      }]
    }]
  },
  typography: select(`Paragraph Typography ${count}`, {
    headline1: 'headline1',
    headline2: 'headline2',
    headline3: 'headline3',
    headline4: 'headline4',
    headline5: 'headline6',
    headline6: 'headline6',
    body1: 'body1',
    body2: 'body2',
    subtitle1: 'subtitle1',
    subtitle2: 'subtitle2',
    overline: 'overline',
    caption: 'caption',
    Empty: undefined
  }, options.typography || undefined, knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH),
  color: select(`Paragraph Color ${count}`, {
    primary: 'primary',
    secondeary: 'secondary',
    textPrimary: 'textPrimary',
    textSecondary: 'textSecondary',
    error: 'error',
    Empty: undefined
  }, (options.color) || undefined, knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH),
  custom_color: { rgba: color(`Paragraph Custom Color`, (options.custom_color && options.custom_color.rgba) || '', knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH) },
  line_height: text(`Paragraph Line Height ${count}`, options.line_height || '', knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH),
  align: select(`Paragraph Align ${count}`, {
    'left': 'left',
    'center': 'center',
    'right': 'right',
    'justify': 'justify',
    Empty: undefined
  }, options.align || undefined, knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH),
  font: select(`Paragraph Font ${count}`, {
    alt1: 'alt1', alt2: 'alt2', alt3: 'alt3', alt4: 'alt4', Empty: undefined
  }, (options.font) || undefined, knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH),
  font_size: text(`Paragraph Font Size ${count}`, options.font_size || '', knob || CONFIG_STORYBOOK.KNOBS.PARAGRAPH)
})

export const storyAccordion = ({}: StorybookOptionProps & { options?: Partial<AccordionStoryblok> } = {}): AccordionStoryblok => ({
  _uid: getUid(),
  component: 'accordion'
})

export const storyAccordionItem = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<AccordionItemStoryblok> } = {}): AccordionItemStoryblok => ({
  _uid: getUid(),
  component: 'accordion_item',
  title: text(`Accordion Item Title ${count}`, options.title || getLabel(4), knob || CONFIG_STORYBOOK.KNOBS.ACCORDION)
})

export const storyButtonList = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ButtonListStoryblok> } = {}): ButtonListStoryblok => ({
  _uid: getUid(),
  component: 'button_list',
  property: optionsKnob(`Button List Properties ${count}`, {
    'margin-left': 'margin-left', 'align-right': 'align-right', Empty: undefined
  }, options.property || undefined, { display: 'inline-check' }, knob || CONFIG_STORYBOOK.KNOBS.BUTTON_LIST) as ButtonListStoryblok['property']
})
