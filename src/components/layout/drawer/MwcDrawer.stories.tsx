import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { customSettings, customSettingsWithDrawer, simpleSettings } from '../../../../.storybook/dummy/toolbar'
import { toggleLeftNavigation } from '../../../utils/state/actions'
import MwcDrawer from './DrawerElement'
import Button from '@material-ui/core/Button'

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
        <MwcDrawer settings={props} />
      </>
    )
  )
  .add(
    'Drawer Custom Toolbar',
    () => (
      <>
        <Button onClick={() => toggleLeftNavigation()}>Toggle Drawer</Button>
        <MwcDrawer settings={custom} />
      </>
    )
  )
  .add(
    'Drawer with custom drawer',
    () => (
      <div>
        <Button onClick={() => toggleLeftNavigation()}>Toggle Drawer</Button>
        <MwcDrawer settings={customSettingsWithDrawer} />
      </div>
    )
  )
