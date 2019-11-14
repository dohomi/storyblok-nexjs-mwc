import { storiesOf } from '@storybook/react'
import Headline from './Headline'
import { HeadlineStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'
// @ts-ignore

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
// .addDecorator(withSmartKnobs)
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
  .add(
    'Headline alternative font',
    () => (
      <>
        <Headline content={{ ...props3 }} />
        <Headline content={{ ...props3, text: 'Font 1', font: 'alt1' }} />
        <Headline content={{ ...props3, text: 'Font 2', font: 'alt2' }} />
        <Headline content={{ ...props3, text: 'Font 3', font: 'alt3' }} />
        <Headline content={{ ...props3, text: 'Font 4', font: 'alt4' }} />
      </>
    )
  )
  .add(
    'Headline customization',
    () => (
      <>
        <h3>Colors:</h3>
        <Headline content={{ ...props3 }} />
        <Headline content={{ ...props3, text: 'Primary', color: 'primary' }} />
        <Headline content={{ ...props3, text: 'Secondary', color: 'secondary' }} />
        <Headline content={{ ...props3, text: 'Text Primary', color: 'textPrimary' }} />
        <Headline content={{ ...props3, text: 'Text Secondary', color: 'textSecondary' }} />
        <Headline content={{ ...props3, text: 'Text Muted', color: 'textSecondary' }} />
        <Headline content={{ ...props3, text: 'Text Error', color: 'error' }} />
        <Headline content={{ ...props3, text: 'Custom', custom_color: { rgba: '#028800' } }} />
        <h3>Class names:</h3>
        <Headline content={{ ...props3, text: 'Font weight bold', class_names: { values: ['font-weight-bold'] } }} />
        <Headline
          content={{ ...props3, text: 'Font weight bolder', class_names: { values: ['font-weight-bolder'] } }} />
        <Headline content={{ ...props3, text: 'Font weight light', class_names: { values: ['font-weight-light'] } }} />
        <Headline
          content={{ ...props3, text: 'Font weight lighter', class_names: { values: ['font-weight-lighter'] } }} />
        <Headline
          content={{ ...props3, text: 'Font weight normal', class_names: { values: ['font-weight-normal'] } }} />
        <Headline
          content={{ ...props3, text: 'Monospace', class_names: { values: ['text-monospace'] } }} />
        <Headline
          content={{ ...props3, text: 'Uppercase', class_names: { values: ['text-uppercase'] } }} />
        <Headline
          content={{ ...props3, text: 'Italic', class_names: { values: ['font-italic'] } }} />
        <Headline
          content={{ ...props3, text: 'Muted', class_names: { values: ['text-muted'] } }} />
        <Headline
          content={{
            ...props3,
            text: 'Color black 50%, Background primary',
            class_names: { values: ['text-black-50', 'bg-primary'] }
          }} />
        <Headline
          content={{
            ...props3,
            text: 'Color black 50%, Background error/danger',
            class_names: { values: ['text-black-50', 'bg-danger'] }
          }} />
        <Headline
          content={{
            ...props3,
            text: 'Color white 50%, Background secondary',
            class_names: { values: ['text-white-50', 'bg-secondary'] }
          }} />
        <Headline
          content={{
            ...props3,
            text: 'Color white 50%, Background dark',
            class_names: { values: ['text-white-50', 'bg-dark'] }
          }} />
        <Headline
          content={{
            ...props3,
            text: 'Color black 50%, Background light',
            class_names: { values: ['text-black-50', 'bg-light'] }
          }} />
        <Headline
          content={{
            ...props3,
            text: 'Color black 50%, Background white',
            class_names: { values: ['text-black-50', 'bg-white'] }
          }} />
        <Headline
          content={{
            ...props3,
            text: 'Color white 50%, Background black',
            class_names: { values: ['text-white-50', 'bg-black'] }
          }} />
        <hr />
        <h2>Example increase line height 2em:</h2>
        <Headline
          content={{
            ...props3,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim nulla, ultricies eget posuere vel, accumsan quis eros. Nulla mattis risus sed sapien feugiat malesuada. Suspendisse porta nisi non risus efficitur, ac blandit orci cursus. Integer congue nulla massa, ac commodo lorem sollicitudin et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis eget feugiat lacus. Ut vehicula in lectus sed hendrerit.',
            tag: 'p',
            line_height: '2em'
          }} />
      </>
    )
  )
