import { storiesOf } from '@storybook/react'
import NavList from './NavList'
import * as React from 'react'
import { storyNavItem, storyNavList } from '../../../.storybook/dummy/core/various'
import { boolean } from '@storybook/addon-knobs'


storiesOf('Nav List', module)
  .add(
    'Playground',
    () => {
      const forceCollapse = boolean('Force Collapse simulate mobile', false)
      return (<NavList content={
          {
            ...storyNavList(),
            forceCollapse,
            body: [
              storyNavItem({ count: 1 }),
              storyNavItem({ count: 2 }),
              storyNavItem({ count: 3 }),
              storyNavItem({ count: 4 }),
              storyNavItem({ count: 5 })
            ]
          }
        } />
      )
    }
  )

