import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './Button'
import { ButtonStoryblok } from '../../typings/generated/components-schema'

const defaultProps: ButtonStoryblok = {
  label: 'Text Button',
  _uid: '123',
  component: 'button'
}

const variant1: ButtonStoryblok = {
  ...defaultProps,
  label: 'Large Button',
  size: 'lm-button-large'
}
const variant2: ButtonStoryblok = {
  ...defaultProps,
  label: 'Small Button',
  size: 'dense'
}

const variant3: ButtonStoryblok = {
  ...defaultProps,
  label: 'Outline Button',
  variant: 'outlined'
}

storiesOf('Button', module)
  .add(
    'Text Button',
    () => (
      <>
        <Button content={defaultProps} />
        <Button content={variant1} />
        <Button content={variant2} />
        <Button content={variant3} />
      </>
    )
  )
