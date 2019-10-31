import { storiesOf } from '@storybook/react'
import Headline from './Headline'
import { HeadlineStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const props: HeadlineStoryblok = {
  _uid: '12312',
  component: 'headline',
  text: 'Headline1',
  typography: 'headline1'
}

const props1: HeadlineStoryblok = {
  ...props,
  text: 'Headline2',
  typography: 'headline2'
}

const props2: HeadlineStoryblok = {
  ...props,
  text: 'Headline3',
  typography: 'headline3'
}

const props3: HeadlineStoryblok = {
  ...props,
  text: 'Headline4',
  typography: 'headline4'
}

const props4: HeadlineStoryblok = {
  ...props,
  text: 'Headline5',
  typography: 'headline5'
}

const props5: HeadlineStoryblok = {
  ...props,
  text: 'Headline6',
  typography: 'headline6'
}

const props6: HeadlineStoryblok = {
  ...props,
  text: 'subtitle',
  typography: 'subtitle1'
}

const props7: HeadlineStoryblok = {
  ...props,
  text: 'subtitle2',
  typography: 'subtitle2'
}

storiesOf('Headline', module)
  .add(
    'Headline',
    () => (
      <>
        <Headline content={props} />
        <Headline content={props1} />
        <Headline content={props2} />
        <Headline content={props3} />
        <Headline content={props4} />
        <Headline content={props5} />
        <Headline content={props6} />
        <Headline content={props7} />
        <Headline content={{ ...props7, typography: 'button', text: 'button' }} />
        <Headline content={{ ...props7, typography: 'body1', text: 'body1' }} />
        <Headline content={{ ...props7, typography: 'body2', text: 'body2' }} />
        <Headline content={{ ...props7, typography: 'caption', text: 'caption' }} />
        <Headline content={{ ...props7, typography: 'overline', text: 'overline' }} />
      </>
    )
  )
