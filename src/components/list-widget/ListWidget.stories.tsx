import { storiesOf } from '@storybook/react'
import ListWidget from './ListWidget'
import * as React from 'react'
import { ListsStoryblok, ListWidgetStoryblok, NavListStoryblok } from '../../typings/generated/components-schema'
import SetStoriesDecorator from '../../../.storybook/components/SetStoriesWrapper'

const props: ListWidgetStoryblok = {
  _uid: '123',
  component: 'list_widget',
  maximum_items: 4
}
const listsOption: ListsStoryblok = {
  component: 'lists',
  _uid: '123123'
}

const linksOption: NavListStoryblok = {
  component: 'nav_list',
  _uid: '435435',
  properties: ['flex-column']
}

storiesOf('List Widget', module)
  .addDecorator(SetStoriesDecorator)
  .add(
    'Card List fetch 4',
    () => (
      <div className="p-3">
        <h4>Default:</h4>
        <ListWidget content={props} />
        <h4>List type:</h4>
        <ListWidget content={{ ...props, list_options: [listsOption] }} />
        <h4>Links type:</h4>
        <ListWidget content={{ ...props, list_options: [linksOption] }} />
      </div>
    )
  )
