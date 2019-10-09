import { storiesOf } from '@storybook/react'
import Table from './Table'
import { TableStoryblok } from '../../typings/generated/components-schema'
import * as React from 'react'

const props: TableStoryblok = {
  _uid: '123',
  component: 'table',
  body: {
    tbody: [
      'Content 1',
      'Content 2',
      'Content 3'
    ],
    thead: [
      'Head 1',
      'Head 2',
      'Head 3'
    ]
  }
}

storiesOf('Table', module)
  .add(
    'Table',
    () => (
      <Table content={props} />
    )
  )
