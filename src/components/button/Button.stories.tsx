import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './Button'
import { ButtonStoryblok } from '../../typings/generated/components-schema'
import LmMuiButton from './LmMuiButton'

const defaultProps: ButtonStoryblok = {
  label: 'Text Button',
  _uid: '123',
  component: 'button'
}

const iconProps: ButtonStoryblok = {
  icon: { name: 'home' },
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
  .add(
    'Primary Button',
    () => (
      <>
        <Button content={{ ...defaultProps, color: 'primary' }} />
        <Button content={{ ...variant1, color: 'primary' }} />
        <Button content={{ ...variant2, color: 'primary' }} />
        <Button content={{ ...variant3, color: 'primary' }} />
      </>
    )
  )
  .add(
    'Mixed Button',
    () => (
      <>
        <Button content={{ ...defaultProps, variant: 'outlined' }} />
        <Button content={{ ...defaultProps, color: 'secondary_text' }} />
        <Button content={{ ...defaultProps, color: 'secondary' }} />
        <Button content={{ ...variant1, color: 'secondary' }} />
        <Button content={{ ...variant2, color: 'primary_text' }} />
        <Button content={{ ...variant3, color: 'dark' }} />
      </>
    )
  )
  .add(
    'Mui Button',
    () => (
      <>
        <div className="p-2">
          <LmMuiButton content={defaultProps} />
          <LmMuiButton content={{ ...defaultProps, icon: { name: 'home' } }} />
          <LmMuiButton content={{ ...defaultProps, icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'fab' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', icon: { name: 'home' } }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, variant: 'fab', color: 'secondary' }} />
        </div>
        <div className="p-2">

        </div>
      </>
    )
  )
