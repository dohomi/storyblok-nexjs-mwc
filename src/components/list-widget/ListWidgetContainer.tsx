import ListWidgetLists from './ListWidgetLists'
import ListWidgetCards from './ListWidgetCards'
import * as React from 'react'
import { FunctionComponent } from 'react'
import {
  CardListStoryblok,
  ListsStoryblok,
  ListWidgetStoryblok,
  NavListStoryblok
} from '../../typings/generated/components-schema'
import ListWidgetLinks from './ListWidgetLinks'
import { AppApiRequestPayload } from '../../typings/app'

const ListWidgetContainer: FunctionComponent<{
  listOption: (ListsStoryblok | CardListStoryblok | NavListStoryblok)
  content: ListWidgetStoryblok
  items: AppApiRequestPayload['allStories']
}> = ({ listOption, content, items }) => {
  if (listOption.component === 'lists') {
    return <ListWidgetLists content={content} items={items} options={listOption} />
  } else if (listOption.component === 'nav_list') {
    return <ListWidgetLinks items={items} options={listOption} content={content} />
  }
  return <ListWidgetCards content={content}
                          items={items}
                          options={listOption} />
}

export default ListWidgetContainer
