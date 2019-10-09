import { storiesOf } from '@storybook/react'
import ButtonList from './ButtonList'
import { ButtonListStoryblok, ButtonStoryblok } from '../../typings/generated/components-schema'


const defaultProps: ButtonStoryblok = {
  label: 'Text Button',
  _uid: '123',
  component: 'button'
}

const variant1: ButtonStoryblok = {
  ...defaultProps,
  label: 'Large Button',
  size: 'lm-button-large',
  _uid: '1235'
}

const props: ButtonListStoryblok = {
  ...defaultProps,
  component: 'button_list',
  body: [defaultProps, variant1]
}

const props2: ButtonListStoryblok = {
  ...props,
  body: [defaultProps, variant1],
  property: ['align_right']
}
storiesOf('Button List', module)
  .add(
    'Button List',
    () => (
      <>
        <div>
          <ButtonList content={props2} />
        </div>
        <div>
          <ButtonList content={props} />
        </div>
      </>
    )
  )
