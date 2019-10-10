import { storiesOf } from '@storybook/react'
import NavList from './NavList'
import * as React from 'react'
import { NavItemStoryblok, NavListStoryblok } from '../../typings/generated/components-schema'

const props: NavListStoryblok = {
  _uid: '123',
  component: 'nav_list',
  header: 'Test',
  body: [{
    _uid: '123123',
    component: 'nav_item',
    name: 'First'
  }, {
    _uid: '12asd',
    component: 'nav_item',
    name: 'Second'
  }, {
    _uid: '12312',
    component: 'nav_item',
    name: 'Third'
  }] as NavItemStoryblok[]
}

storiesOf('Nav List', module)
  .add(
    'Nav List',
    () => (
      <NavList content={props} />
    )
  )
  .add(
    'Nav List Column',
    () => (
      <NavList content={{ ...props, collapse_on_mobile: true, properties: ['flex-column'] }} />
    )
  )
