import * as React from 'react'
import { FunctionComponent } from 'react'
import StoriesService from '../../utils/StoriesService'
import { ListWidgetStoryblok } from '../../typings/generated/components-schema'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import ListWidgetCards from './ListWidgetCards'
import ListWidgetLists from './ListWidgetLists'

const ListWidget: FunctionComponent<{ content: ListWidgetStoryblok }> = ({ content }) => {
  const filter = content.categories || []
  const sort = content.sort
  const sortDescending = content.sort_descending
  const items: PageItem[] = StoriesService.getAllStories()
    .filter((item: PageItem) => {
      const itemContent = item.content as PageComponent
      const itemCategories = itemContent.categories || []
      if (filter.length) {
        return content.match_all_categories
          ? filter.every(element => itemCategories.includes(element))
          : filter.some(element => itemCategories.includes(element))
      }
      return itemCategories.length
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

  if (content.variant === 'list') {
    return <ListWidgetLists content={content} items={items} />
  }

  return <ListWidgetCards content={content} items={items} />

}

export default ListWidget
