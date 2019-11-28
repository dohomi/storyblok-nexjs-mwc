import { storiesOf } from '@storybook/react'
import ListWidget from './ListWidget'
import * as React from 'react'
import { ListsStoryblok, ListWidgetStoryblok, NavListStoryblok } from '../../typings/generated/components-schema'
import SetStoriesDecorator from '../../../.storybook/components/SetStoriesDecorator'
import { storyCardList, storyListWidget } from '../../../.storybook/dummy/core/section'

const props: ListWidgetStoryblok = {
  _uid: '123',
  component: 'list_widget',
  maximum_items: 4
}

const filtered: ListWidgetStoryblok = {
  _uid: '546546',
  component: 'list_widget',
  maximum_items: 10,
  tags: {
    values: ['testimonial']
  }
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
    'Variants',
    () => (
      <div className="p-3">
        <h2>Limit is set to 4:</h2>
        <h4>Default:</h4>
        <ListWidget content={props} />
        <h4>List type:</h4>
        <ListWidget content={{ ...props, list_options: [listsOption] }} />
        <h4>Links type:</h4>
        <ListWidget content={{ ...props, list_options: [linksOption] }} />
      </div>
    )
  )
  .add(
    'Filtered',
    () => (
      <div className="p-3">
        <h2>Limit is set to 10:</h2>
        <h4>Default:</h4>
        <ListWidget content={filtered} />
        <h4>List type:</h4>
        <ListWidget content={{ ...filtered, list_options: [listsOption] }} />
        <h4>Links type:</h4>
        <ListWidget content={{ ...filtered, list_options: [linksOption] }} />
      </div>
    )
  )
  .add(
    'Playground',
    () => {
      const listOpts = storyListWidget({
        options: {
          tags: {
            values: ['testimonial']
          },
          maximum_items: 10,
          list_options: [storyCardList()]
        }
      })

      return (
        <div className="p-5">
          <ListWidget content={{ ...listOpts }} />
        </div>
      )
    }
  )
