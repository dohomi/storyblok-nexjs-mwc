import { storiesOf } from '@storybook/react'
import NavMenu from './NavMenu'
import { NavMenuItemStoryblok, NavMenuStoryblok, RowStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
import { columns } from '../../../.storybook/dummy/section'

const props: NavMenuStoryblok = {
  _uid: '123',
  component: 'nav_menu',
  title: 'A very long Menu',
  body: [{
    label: 'First',
    _uid: '112',
    component: 'nav_menu_item'
  }, {
    label: 'Second',
    _uid: '12312',
    component: 'nav_menu_item'
  }] as NavMenuItemStoryblok[]
}

const columnSection: NavMenuStoryblok = {
  _uid: '2234234',
  component: 'nav_menu',
  title: 'A Mega Menu',
  body: [{
    body: columns,
    _uid: '34241231',
    component: 'row'
  }] as RowStoryblok[]
}


storiesOf('Nav menu', module)
  .add(
    'Nav Menu',
    () => (
      <>
        <h3>Default:</h3>
        <NavMenu content={props} />
        <h3>Bottom Alignment</h3>

        <NavMenu content={{ ...props, alignment: 'bottomStart' }} />

        <h3>Bottom Alignment</h3>
        <div className={'text-center'}>
          <NavMenu content={{ ...props, alignment: 'bottomStart' }} />
        </div>
        <h3>Bottom Right Alignment</h3>
        <div className={'text-center'}>
          <NavMenu content={{ ...props, alignment: 'bottomEnd', border_radius: '0' }} />
        </div>
        <h3>Border Radius</h3>
        <div className={'text-center'}>
          <NavMenu content={{ ...props, alignment: 'bottomEnd', border_radius: '16px 0px' }} />
        </div>
      </>
    )
  )
  .add(
    'Mega Menu',
    () => (
      <>
        <NavMenu content={{ ...columnSection, alignment: 'bottomEnd', border_radius: '16px 0px' }} />
      </>
    )
  )