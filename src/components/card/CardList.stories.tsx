import { storiesOf } from '@storybook/react'
import CardList from './CardList'
import { CardListItemStoryblok, CardListStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const cardListBody: CardListItemStoryblok[] = [{
  _uid: '123',
  component: 'card_list_item',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}]

const cardList: CardListStoryblok = {
  _uid: '12311',
  component: 'card_list',
  body: cardListBody
}

storiesOf('CardList', module)
  .add(
    'Card List',
    () => (
      <CardList content={cardList} />
    )
  )
