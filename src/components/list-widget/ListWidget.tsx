import * as React from 'react'
import { FunctionComponent } from 'react'
import StoriesService from '../../utils/StoriesService'
import {
  CardListItemStoryblok,
  CardListStoryblok,
  ListWidgetStoryblok
} from '../../typings/generated/components-schema'
import CardList from '../card/CardList'
import { PageComponent, PageItem } from '../../typings/generated/schema'


const ListWidget: FunctionComponent<{ content: ListWidgetStoryblok }> = ({ content }) => {
  const filter = content.categories || []
  const sort = content.sort
  const sortDescending = content.sort_descending
  const filteredItems = StoriesService.getAllStories()
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
  const cardListItems: CardListItemStoryblok[] = filteredItems
    .map((item: PageItem) => {
      const itemContent = item.content as PageComponent
      return {
        _uid: itemContent._uid,
        component: 'card_list_item',
        title: itemContent.preview_title || itemContent.meta_title || item.name,
        subtitle: itemContent.preview_subtitle,
        description: itemContent.preview_teaser,
        image: itemContent.preview_image,
        link: {
          cached_url: item.full_slug || item.slug || item.path,
          linktype: 'stories'
        }
      } as CardListItemStoryblok
    })

  const listOption = (content.card_list_option && content.card_list_option[0]) || {}
  const cardList: CardListStoryblok = {
    ...listOption,
    _uid: content._uid,
    component: 'card_list',
    body: cardListItems
  }

  return (
    <CardList content={cardList} />
  )
}

export default ListWidget
