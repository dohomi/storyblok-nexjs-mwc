import { storiesOf } from '@storybook/react'
import Paragraph from './Paragraph'
import { ParagraphStoryblok } from '../../typings/generated/components-schema'

const props: ParagraphStoryblok = {
  _uid: '123',
  component: 'paragraph',
  text: 'Hello World'
}

storiesOf('Paragraph', module)
  .add(
    'Paragraph',
    () => (
      <>
        <Paragraph content={props} />
        <Paragraph content={{...props,typography:'subtitle2'}} />
        <Paragraph content={{...props,typography:'headline5'}} />
        <Paragraph content={{...props,typography:'headline5'}} />
        <Paragraph content={{...props,typography:'body2'}} />
      </>
    )
  )
