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
const twitterPng = 'https://img2.storyblok.com/f/66717/273x256/42d8e47bd5/twitter-icon.png'

const iconButton: ButtonStoryblok = {
  _uid: '34334',
  component: 'button',
  image: twitterPng
}

storiesOf('Button', module)
  // .add(
  //   'Text Button',
  //   () => (
  //     <>
  //       <Button content={defaultProps} />
  //       <Button content={variant1} />
  //       <Button content={variant2} />
  //       <Button content={variant3} />
  //     </>
  //   )
  // )
  // .add(
  //   'Primary Button',
  //   () => (
  //     <>
  //       <Button content={{ ...defaultProps, color: 'primary' }} />
  //       <Button content={{ ...variant1, color: 'primary' }} />
  //       <Button content={{ ...variant2, color: 'primary' }} />
  //       <Button content={{ ...variant3, color: 'primary' }} />
  //     </>
  //   )
  // )
  // .add(
  //   'Mixed Button',
  //   () => (
  //     <>
  //       <Button content={{ ...defaultProps, variant: 'outlined' }} />
  //       <Button content={{ ...defaultProps, color: 'secondary_text' }} />
  //       <Button content={{ ...defaultProps, color: 'secondary' }} />
  //       <Button content={{ ...variant1, color: 'secondary' }} />
  //       <Button content={{ ...variant2, color: 'primary_text' }} />
  //       <Button content={{ ...variant3, color: 'dark' }} />
  //     </>
  //   )
  // )
  .add(
    'Mui Button',
    () => (
      <>
        <div className="p-2">
          <LmMuiButton content={defaultProps} />
          <LmMuiButton content={{ ...defaultProps, icon: { name: 'home' }, color: 'primary' }} />
          <LmMuiButton content={{ ...defaultProps, icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'fab' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', icon: { name: 'home' }, color: 'primary' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, variant: 'fab', color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', size: 'dense' }} />
          <LmMuiButton
            content={{ ...defaultProps, variant: 'fab', size: 'dense', icon: { name: 'home' }, color: 'primary' }} />
          <LmMuiButton
            content={{ ...defaultProps, variant: 'fab', size: 'dense', icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, variant: 'fab', size: 'dense', color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', size: 'lm-button-large' }} />
          <LmMuiButton
            content={{
              ...defaultProps,
              variant: 'fab',
              size: 'lm-button-large',
              icon: { name: 'home' },
              color: 'primary'
            }} />
          <LmMuiButton
            content={{
              ...defaultProps,
              variant: 'fab',
              size: 'lm-button-large',
              icon: { name: 'home' },
              color: 'secondary'
            }} />
          <LmMuiButton content={{ ...iconProps, variant: 'fab', size: 'lm-button-large', color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'fab', size: 'lm-button-xlarge' }} />
          <LmMuiButton
            content={{
              ...defaultProps,
              variant: 'fab',
              size: 'lm-button-xlarge',
              icon: { name: 'home' },
              color: 'primary'
            }} />
          <LmMuiButton
            content={{
              ...defaultProps,
              variant: 'fab',
              size: 'lm-button-xlarge',
              icon: { name: 'home' },
              color: 'secondary'
            }} />
          <LmMuiButton content={{ ...iconProps, variant: 'fab', size: 'lm-button-xlarge', color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'raised' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'raised', icon: { name: 'home' }, color: 'primary' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'raised', icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, variant: 'raised', color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'outlined' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'outlined', icon: { name: 'home' }, color: 'primary' }} />
          <LmMuiButton content={{ ...defaultProps, variant: 'outlined', icon: { name: 'home' }, color: 'secondary' }} />
          <LmMuiButton content={{ ...iconProps, variant: 'outlined', color: 'secondary' }} />
        </div>
        <div className="p-2">
          <LmMuiButton content={{ ...defaultProps, variant: 'outlined', corners: 'lm-button-shaped' }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'primary',
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'secondary',
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton
            content={{ ...iconProps, variant: 'outlined', color: 'secondary', corners: 'lm-button-shaped' }} />
        </div>
        <div className="p-2">
          <LmMuiButton
            content={{ ...defaultProps, variant: 'outlined', corners: 'lm-button-square', size: 'dense' }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'primary',
            size: 'dense',
            corners: 'lm-button-square'
          }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'secondary',
            size: 'dense',
            corners: 'lm-button-square'
          }} />
          <LmMuiButton
            content={{ ...iconProps, variant: 'outlined', color: 'secondary', corners: 'lm-button-square' }} />
        </div>
        <div className="p-2">
          <LmMuiButton
            content={{ ...defaultProps, variant: 'outlined', corners: 'lm-button-square', size: 'lm-button-large' }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'primary',
            size: 'lm-button-large',
            corners: 'lm-button-square'
          }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'secondary',
            size: 'lm-button-large',
            corners: 'lm-button-square'
          }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              color: 'secondary',
              corners: 'lm-button-square',
              size: 'lm-button-large'
            }} />
        </div>
        <div className="p-2">
          <LmMuiButton
            content={{ ...defaultProps, variant: 'outlined', corners: 'lm-button-square', size: 'lm-button-xlarge' }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'primary',
            size: 'lm-button-xlarge',
            corners: 'lm-button-square'
          }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'raised',
            icon: { name: 'home' },
            color: 'secondary',
            size: 'lm-button-xlarge',
            corners: 'lm-button-square'
          }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              color: 'secondary',
              corners: 'lm-button-square',
              size: 'lm-button-xlarge'
            }} />
        </div>
        <div className="p-2">
          <LmMuiButton
            content={{ ...defaultProps, variant: 'outlined', corners: 'lm-button-shaped', size: 'lm-button-xlarge' }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'primary',
            size: 'lm-button-xlarge',
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'raised',
            icon: { name: 'home' },
            color: 'secondary',
            size: 'lm-button-xlarge',
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              color: 'secondary',
              corners: 'lm-button-shaped',
              size: 'lm-button-xlarge'
            }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              color: 'primary',
              corners: 'lm-button-shaped',
              size: 'lm-button-xlarge'
            }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              corners: 'lm-button-shaped',
              size: 'lm-button-xlarge'
            }} />
        </div>
        <div className="p-2">
          <LmMuiButton
            content={{
              ...defaultProps,
              variant: 'outlined',
              corners: 'lm-button-shaped',
              properties: ['disable-ripple'],
              size: 'lm-button-xlarge'
            }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'outlined',
            icon: { name: 'home' },
            color: 'primary',
            size: 'lm-button-xlarge',
            properties: ['disable-ripple'],
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton content={{
            ...defaultProps,
            variant: 'raised',
            icon: { name: 'home' },
            color: 'secondary',
            properties: ['disable-ripple'],
            size: 'lm-button-xlarge',
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              color: 'secondary',
              properties: ['disable-ripple'],
              corners: 'lm-button-shaped',
              size: 'lm-button-xlarge'
            }} />
          <LmMuiButton
            content={{
              ...iconProps,
              variant: 'outlined',
              color: 'primary',
              properties: ['disable-ripple'],
              corners: 'lm-button-shaped',
              size: 'lm-button-xlarge'
            }} />
          <LmMuiButton
            content={{
              ...iconProps,
              properties: ['disable-ripple'],
              variant: 'outlined',
              corners: 'lm-button-shaped',
              size: 'lm-button-xlarge'
            }} />
        </div>
      </>
    )
  )
  .add(
    'Mui Button with image',
    () => (
      <>
        <LmMuiButton content={{ ...iconButton, size: 'dense' }} />
        <LmMuiButton content={iconButton} />
        <LmMuiButton content={{ ...iconButton, size: 'lm-button-large' }} />
        <LmMuiButton content={{ ...iconButton, size: 'lm-button-xlarge' }} />
        <LmMuiButton content={{ ...iconButton, size: 'lm-button-xlarge', label: 'Label' }} />
        <div>
          <LmMuiButton content={{ ...iconButton, variant: 'outlined', label: 'Label' }} />
          <LmMuiButton content={{ ...iconButton, variant: 'outlined', label: 'Label', corners: 'lm-button-shaped' }} />
          <LmMuiButton content={{ ...iconButton, variant: 'outlined', label: 'Label', corners: 'lm-button-square' }} />
        </div>
        <div>
          <LmMuiButton content={{ ...iconButton, variant: 'fab', label: 'Label', size: 'dense' }} />
          <LmMuiButton content={{
            ...iconButton,
            variant: 'fab',
            label: 'Label',
            size: 'lm-button-large',
            corners: 'lm-button-shaped'
          }} />
          <LmMuiButton content={{
            ...iconButton,
            variant: 'fab',
            label: 'Label',
            size: 'lm-button-xlarge',
            corners: 'lm-button-square'
          }} />
        </div>
      </>
    )
  )
