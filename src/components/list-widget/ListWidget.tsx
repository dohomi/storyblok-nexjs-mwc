import React, { FunctionComponent } from 'react'
import {
  CardListStoryblok,
  ListsStoryblok,
  ListWidgetStoryblok,
  NavListStoryblok
} from '../../typings/generated/components-schema'
import ListWidgetWithSearch from './ListWidgetWithSearch'
import ListWidgetContainer from './ListWidgetContainer'
import { useAppContext } from '../provider/AppProvider'
import { StoryData } from 'storyblok-js-client'
import { PageComponent } from '../../typings/generated/schema'

export const listWidgetFilter = (content: ListWidgetStoryblok, allStories: StoryData<PageComponent>[] = []) => {
  const filter = (content.tags && content.tags.values) || []
  const sort = content.sort
  const sortDescending = content.sort_descending
  const stories = allStories
    .filter((item) => {
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
    .sort((a, b) => {
      let sortACriteria = a.published_at
      let sortBCriteria = b.published_at
      const itemContentA = a.content
      const itemContentB = b.content
      if (sort === 'created') {
        sortACriteria = a.created_at
        sortBCriteria = b.created_at
      } else if (sort === 'updated') {
        sortBCriteria = b.published_at
        sortACriteria = a.published_at
      } else if (sort === 'publish') {
        sortACriteria = itemContentA.preview_publish_date || a.published_at
        sortBCriteria = itemContentB.preview_publish_date || b.published_at
      } else if (sort === 'title') {
        sortACriteria = String(itemContentA.preview_title || a.name).toLowerCase()
        sortBCriteria = String(itemContentB.preview_title || b.name).toLowerCase()
      }
      if (String(sortACriteria) < String(sortBCriteria)) {
        return sortDescending ? +1 : -1
      }
      if (String(sortACriteria) > String(sortBCriteria)) {
        return sortDescending ? -1 : 1
      }
      return 0
    })
  if (content.maximum_items) {
    return stories.slice(0, content.maximum_items)
  }
  return stories
}

const ListWidget: FunctionComponent<{ content: ListWidgetStoryblok }> = ({ content }) => {

  const { listWidgetData } = useAppContext()
  let items = listWidgetData[content._uid] || []

  const listOption: (ListsStoryblok | CardListStoryblok | NavListStoryblok) = (content.list_options && content.list_options[0]) || {}

  if (content.enable_for_search) {
    return <ListWidgetWithSearch listOption={listOption} content={content} items={items} />
  }
  return <ListWidgetContainer listOption={listOption} content={content} items={items} />
}

export default ListWidget
