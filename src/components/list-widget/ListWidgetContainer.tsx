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
import { PageItem } from '../../typings/generated/schema'
import ListWidgetLinks from './ListWidgetLinks'

const ListWidgetContainer: FunctionComponent<{
  listOption: (ListsStoryblok | CardListStoryblok | NavListStoryblok)
  content: ListWidgetStoryblok
  items: PageItem[]
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
