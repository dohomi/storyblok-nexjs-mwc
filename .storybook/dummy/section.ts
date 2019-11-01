import {
  ButtonStoryblok,
  ColumnStoryblok,
  HeadlineStoryblok,
  ParagraphStoryblok,
  RowStoryblok
} from '../../src/typings/generated/components-schema'

const items: (HeadlineStoryblok | ParagraphStoryblok | ButtonStoryblok)[] = [{
  component: 'headline',
  _uid: 'ododod',
  text: 'Headline'
}, {
  text: '<h3>Hello World</h3>',
  component: 'paragraph',
  _uid: '789'
}, {
  text: '<h4>Another Paragraph</h4>',
  _uid: '987',
  component: 'paragraph'
}, {
  component: 'button',
  _uid: 'wfjwefj',
  label: 'Test'
}, {
  component: 'button',
  _uid: 'asdfasw32',
  icon: {
    name: 'home'
  }
}, {
  component: 'button',
  _uid: '12313dssad',
  label: 'Test',
  variant: 'outlined'
}]

const column: ColumnStoryblok[] = [{
  body: items,
  _uid: '321',
  component: 'column'
}]

export const columns: ColumnStoryblok[] = [{
  body: items,
  _uid: '23424324432',
  component: 'column',
  width_general: '4'
}, {
  body: items,
  _uid: '252435131',
  component: 'column',
  width_general: '4'
}, {
  body: items,
  _uid: '341531545',
  component: 'column',
  width_general: '4'
}]

export const row: RowStoryblok[] = [{
  body: column,
  _uid: 'qdfaefa',
  component: 'row'
}]
