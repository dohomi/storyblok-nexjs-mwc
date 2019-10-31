import { storiesOf } from '@storybook/react'
import NavList from './NavList'
import * as React from 'react'
import { NavItemStoryblok, NavListStoryblok } from '../../typings/generated/components-schema'

const props: NavListStoryblok = {
  _uid: '123',
  component: 'nav_list',
  header: 'Nav Header',
  body: [{
    _uid: '123123',
    component: 'nav_item',
    name: 'An external link',
    link: {
      cached_url: 'https://google.com'
    }
  }, {
    _uid: '1231235',
    component: 'nav_item',
    name: 'An external link new tab',
    link: {
      cached_url: 'https://google.com'
    },
    open_external: true
  }, {
    _uid: '12asd',
    component: 'nav_item',
    name: 'A telephone number',
    link: {
      cached_url: '+628787456456'
    }
  }, {
    _uid: '12312',
    component: 'nav_item',
    name: 'An email address',
    link: {
      cached_url: 'djgarms@gmail.com'
    }
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
  .add(
    'Nav List Collapse',
    () => (
      <>
        <div>
          <NavList content={{ ...props, collapse_on_mobile: true, forceCollapse: true, properties: ['flex-column'] }} />
        </div>
        <div>
          <NavList content={{ ...props, collapse_on_mobile: true, forceCollapse: true }} />
        </div>

      </>
    )
  )
