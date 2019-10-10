import { storiesOf } from '@storybook/react'
import Header from './Header'
import * as React from 'react'
import { customSettings, simpleSettings } from '../../../../.storybook/dummy/toolbar'

storiesOf('Header', module)
  .add(
    'Header Simple',
    () => (
      <>
        <h3>Default</h3>
        <Header settings={simpleSettings} hasFeature={false} />
        <h3>Secondary</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'secondary' }} hasFeature={false} />
        <h3>Dark</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'dark' }} hasFeature={false} />
        <h3>White</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'white' }} hasFeature={false} />
      </>
    )
  )
  .add(
    'Header Custom',
    () => (
      <Header settings={customSettings} hasFeature={false} />
    )
  )
