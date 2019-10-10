import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { customSettings, simpleSettings } from '../../../../.storybook/dummy/toolbar'
import { toggleLeftNavigation } from '../../../utils/state/actions'
import { Button } from '@rmwc/button'
import MwcDrawer from './MwcDrawer'

const props = {
  ...simpleSettings
}

const custom = {
  ...customSettings
}

storiesOf('Drawer', module)
  .add(
    'Drawer Simple Toolbar',
    () => (
      <>
        <Button onClick={() => toggleLeftNavigation()}>Toggle Drawer</Button>
        <MwcDrawer content={props} />
      </>
    )
  )
  .add(
    'Drawer Custom Toolbar',
    () => (
      <>
        <Button onClick={() => toggleLeftNavigation()}>Toggle Drawer</Button>
        <MwcDrawer content={custom} />
      </>
    )
  )
