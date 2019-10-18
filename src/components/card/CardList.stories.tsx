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
  description: 'Some Description',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '12321312',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  description: 'Some Description',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '123213123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  description: 'Some Description',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}]

const cardListLongDescription: CardListItemStoryblok[] = [{
  _uid: '123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
}, {
  _uid: '123123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '12321312',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  image: 'https://a.storyblok.com/f/57008/5000x3334/bae4d23fcf/amsterdam-retouch.png'
}, {
  _uid: '123213123',
  component: 'card_list_item',
  title: 'Toll',
  subtitle: 'SubTitle',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
  .add(
    'Card List Responsive',
    () => (
      <>
        <CardList content={{ ...cardList }} />
        <div style={{ height: '300px' }}>Some spacing</div>
        <CardList content={{ ...cardList }} />
        <div style={{ height: '300px' }}>Some spacing</div>
        <CardList content={{ ...cardList }} />
        <div style={{ height: '300px' }}>Some spacing</div>
        <CardList content={{ ...cardList }} />
      </>
    )
  )
  .add(
    'Card List Crop Description',
    () => (
      <>
        <CardList content={{ ...cardList, body: cardListLongDescription }} />
        <h3>Only 120 character</h3>
        <CardList content={{ ...cardList, body: cardListLongDescription, description_max_character: 120 }} />
        <h3>No description with value "0"</h3>
        <CardList content={{ ...cardList, body: cardListLongDescription, description_max_character: 0 }} />
      </>
    )
  )
