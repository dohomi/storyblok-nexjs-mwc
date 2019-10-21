import * as React from 'react'
import { FunctionComponent } from 'react'
import StoriesService from '../../utils/StoriesService'
import {
  CardListStoryblok,
  ListsStoryblok,
  ListWidgetStoryblok,
  NavListStoryblok
} from '../../typings/generated/components-schema'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import ListWidgetWithSearch from './ListWidgetWithSearch'
import ListWidgetContainer from './ListWidgetContainer'

const ListWidget: FunctionComponent<{ content: ListWidgetStoryblok }> = ({ content }) => {
  const filter = (content.tags && content.tags.values) || []
  const sort = content.sort
  const sortDescending = content.sort_descending
  let items: PageItem[] = StoriesService.getAllStories()
    .filter((item: PageItem) => {
      const itemCategories = item.tag_list || []
      if (filter.length) {
        return content.match_all_tags
          ? filter.every(element => itemCategories.includes(element))
          : filter.some(element => itemCategories.includes(element))
      }
      if (content.only_tagged) {
        return !!itemCategories.length
      }
      return true
    })
    .sort((a: PageItem, b: PageItem) => {
      let sortACriteria = a.published_at as String
      let sortBCriteria = b.published_at as String
      const itemContentA = a.content as PageComponent
      const itemContentB = b.content as PageComponent
      if (sort === 'created') {
        sortACriteria = a.first_published_at as String
        sortBCriteria = b.first_published_at as String
      } else if (sort === 'updated') {
        sortACriteria = a.published_at as String
        sortBCriteria = b.published_at as String
      } else if (sort === 'publish') {
        sortACriteria = itemContentA.preview_publish_date || a.published_at as String
        sortBCriteria = itemContentB.preview_publish_date || b.published_at as String
      } else if (sort === 'title') {
        sortACriteria = String(itemContentA.preview_title || a.name).toUpperCase()
        sortBCriteria = String(itemContentB.preview_title || b.name).toUpperCase()
      }
      if (sortACriteria < sortBCriteria) {
        return sortDescending ? +1 : -1
      }
      if (sortACriteria > sortBCriteria) {
        return sortDescending ? -1 : 1
      }
      return 0
    })
  if (content.maximum_items) {
    items = items.slice(0, content.maximum_items)
  }
  const listOption: (ListsStoryblok | CardListStoryblok | NavListStoryblok) = (content.list_options && content.list_options[0]) || {}

  if (content.enable_for_search) {
    return <ListWidgetWithSearch listOption={listOption} content={content} items={items} />
  }
  return <ListWidgetContainer listOption={listOption} content={content} items={items} />
}

export default ListWidget
