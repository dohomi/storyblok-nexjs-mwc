import { StorybookOptionProps } from './storybook_typing'
import { ButtonStoryblok, NavMenuStoryblok } from '../../../src/typings/generated/components-schema'
import uuid from 'uuid/v4'
import { CONFIG_STORYBOOK } from '../../components/configStorybook'
import { optionsKnob, select, text } from '@storybook/addon-knobs'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum()

export const getUid = () => uuid()

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

export const getLabel = (words: number = 1) => capitalize(lorem.generateWords(words))

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
export const storyButton = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<ButtonStoryblok> }): ButtonStoryblok => ({
  _uid: getUid(),
  component: 'button',
  label: text(`Label ${count}`, options.label || getLabel(), knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  size: select(`Size ${count}`, {
    'dense': 'dense',
    'lm-button-large': 'lm-button-large',
    'lm-button-xlarge': 'lm-button-xlarge',
    Empty: undefined
  }, options.size || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  variant: select(`Variant ${count}`, {
    raised: 'raised', outlined: 'outlined', fab: 'fab', unelevated: 'unelevated', Empty: undefined
  }, options.variant || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  color: select(`Color ${count}`, {
    secondary: 'secondary',
    secondary_text: 'secondary_text',
    primary: 'primary',
    primary_text: 'primary_text',
    dark: 'dark',
    light: 'light',
    Empty: undefined
  }, options.color || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  corners: select(`Corners ${count}`, {
    'lm-button-shaped': 'lm-button-shaped', 'lm-button-square': 'lm-button-square', Null: undefined
  }, options.corners || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON),
  properties: optionsKnob(`Properties ${count}`, {
    'disable-ripple': 'disable-ripple', 'disable-shadow': 'disable-shadow'
  }, options.properties || undefined, { display: 'inline-check' }, knob || CONFIG_STORYBOOK.KNOBS.BUTTON) as ButtonStoryblok['properties'],
  icon: {
    name: select(`Icon ${count}`, iconOptions, (options.icon && options.icon.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON)
  },
  trailing_icon: {
    name: select(`Trailing Icon ${count}`, iconOptions, (options.icon && options.icon.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON)
  },
  font: select(`Font ${count}`, {
    alt1: 'alt1', alt2: 'alt2', alt3: 'alt3', alt4: 'alt4', Empty: undefined
  }, (options.font) || undefined, knob || CONFIG_STORYBOOK.KNOBS.BUTTON)
})

export const storyMenu = ({ options = {}, knob, count = '' }: StorybookOptionProps & { options?: Partial<NavMenuStoryblok> }): NavMenuStoryblok => ({
  _uid: getUid(),
  component: 'nav_menu',
  title: text(`Title ${count}`, options.title || getLabel(), knob || CONFIG_STORYBOOK.KNOBS.MENU),
  alignment: select(`Alignment ${count}`, {
    bottomEnd: 'bottomEnd',
    bottomStart: 'bottomStart',
    Empty: undefined
  }, options.alignment || undefined, knob || CONFIG_STORYBOOK.KNOBS.MENU),
  icon: {
    name: select(`Icon ${count}`, iconOptions, (options.icon && options.icon.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.MENU)
  },
  icon_collapse: {
    name: select(`Icon Collapse ${count}`, iconOptions, (options.icon_collapse && options.icon_collapse.name) || undefined, knob || CONFIG_STORYBOOK.KNOBS.MENU)
  },
  border_radius: text(`Border Radius ${count}`, options.border_radius || '', knob || CONFIG_STORYBOOK.KNOBS.MENU)
})
