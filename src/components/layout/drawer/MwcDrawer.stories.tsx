import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { customSettings, simpleSettings } from '../../../../.storybook/dummy/toolbar'
import { toggleLeftNavigation } from '../../../utils/state/actions'
import MwcDrawer from './MwcDrawer'
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
