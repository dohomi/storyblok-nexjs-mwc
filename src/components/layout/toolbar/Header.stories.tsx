import { storiesOf } from '@storybook/react'
import Header from './Header'
import * as React from 'react'
import { customSettings, simpleSettings } from '../../../storybook/toolbar'

storiesOf('Toolbar', module)
  .add(
    'Toolbar Simple',
    () => (
      <>
        <h3>Default</h3>
        <Header settings={simpleSettings} />
        <h3>Secondary</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'secondary' }} />
        <h3>Dark</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'dark' }} />
        <h3>White</h3>
        <Header settings={{ ...simpleSettings, toolbar_variant: 'white' }} />
      </>
    )
  )
  .add(
    'Toolbar Custom',
    () => (
      <Header settings={customSettings} />
    )
  )
