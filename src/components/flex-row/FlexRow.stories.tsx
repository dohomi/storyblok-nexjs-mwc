import { storiesOf } from '@storybook/react'
import FlexRow from './FlexRow'
import { FlexRowStoryblok, HeadlineStoryblok, IconStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const icon: IconStoryblok = {
  _uid: '232123',
  component: 'icon',
  name: {
    name: 'home'
  },
  size: 'large'
}

const headline: HeadlineStoryblok = {
  _uid: '12312',
  component: 'headline',
  text: 'Headline1',
  typography: 'headline4'
}

const props: FlexRowStoryblok = {
  _uid: '2we',
  component: 'flex_row',
  body: [icon, headline]
}

const props2: FlexRowStoryblok = {
  _uid: '223434',
  component: 'flex_row',
  body: [{...headline, _uid:'123123'}, headline]
}

const props3: FlexRowStoryblok = {
  _uid: '223434',
  component: 'flex_row',
  body: [icon, {...headline, _uid: '123123'}, headline]
}

storiesOf('Flex Row', module)
  .add(
    'Flex Row',
    () => (
      <>
        <FlexRow content={props} />
        <FlexRow content={props2} />
        <FlexRow content={props3} />
      </>
    )
  )
