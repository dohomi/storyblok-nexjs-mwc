import { storiesOf } from '@storybook/react'
import CardList from './CardList'
import { CardListItemStoryblok, CardListStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const cardListBody: CardListItemStoryblok[] = [{
  _uid: '123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '123123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '12321312',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '123213123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}]

const cardList: CardListStoryblok = {
  _uid: '12311',
  component: 'card_list',
  body: cardListBody
}

storiesOf('Card List Standard', module)
  .add(
    'Card List',
    () => (
      <CardList content={cardList} />
    )
  )
  .add(
    'Card List Over Image',
    () => (
      <CardList content={{ ...cardList, variant: ['over_media', 'font_white', 'title_top'] }} />
    )
  )
