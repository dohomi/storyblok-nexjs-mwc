import CardList from '../card/CardList'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { PageComponent, PageItem } from '../../typings/generated/schema'
import {
  CardListItemStoryblok,
  CardListStoryblok,
  ListWidgetStoryblok
} from '../../typings/generated/components-schema'

const ListWidgetCards: FunctionComponent<{
  content: ListWidgetStoryblok
  items: PageItem[]
  options: CardListStoryblok
}> = ({ items, content, options }) => {
  const cardListItems: CardListItemStoryblok[] = items
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

  const cardList: CardListStoryblok = {
    ...options,
    _uid: content._uid,
    component: 'card_list',
    body: cardListItems
  }
  return <CardList content={cardList} />

}

export default ListWidgetCards
