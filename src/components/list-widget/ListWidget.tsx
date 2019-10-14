import * as React from 'react'
import { FunctionComponent } from 'react'
import StoriesService from '../../utils/StoriesService'
import {
  CardListItemStoryblok,
  CardListStoryblok,
  ListWidgetStoryblok,
  PageStoryblok
} from '../../typings/generated/components-schema'
import CardList from '../card/CardList'


const ListWidget: FunctionComponent<{ content: ListWidgetStoryblok }> = ({ content }) => {
  const cardListItems = StoriesService.getAllStories()
    .filter((item: any) => !!item.content.categories)
    .map((item: any) => {
      console.log(item.home, item.slug)
      const content: PageStoryblok = item.content
      const obj = {
        _uid: content._uid,
        component: 'card_list_item',
        title: content.meta_title || item.name

      } as CardListItemStoryblok
      console.log(obj, item)
      return obj
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
