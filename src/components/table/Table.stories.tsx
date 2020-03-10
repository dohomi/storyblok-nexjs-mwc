import { storiesOf } from '@storybook/react'
import Table from './Table'
import { TableStoryblok } from '../../typings/generated/components-schema'
import React from 'react'
import { storyTable } from '../../../.storybook/dummy/core/various'

const body = {
  tbody: [[
    'Content 1 1',
    'Content 1 2',
    'Content 1 3'
  ], [
    'Content 2 1',
    'Content 2 2',
    'Content 2 3'
  ], [
    'Content 3 1',
    'Content 3 2',
    'Content 3 3'
  ]],
  thead: [
    'Head 1',
    'Head 2',
    'Head 3'
  ]
}
const props: TableStoryblok = {
  _uid: '123',
  component: 'table',
  body: body
}


storiesOf('Table', module)
  .add(
    'Table',
    () => (
      <Table content={props} />
    )
  )
  .add(
    'Table without head',
    () => (
      <Table content={{
        ...props,
        disable_table_head: true
      }} />
    )
  )
  .add(
    'Table variants',
    () => (
      <>
        <div><h3>Bordered</h3></div>
        <Table content={{
          ...props,
          variant: 'bordered'
        }} />
        <div><br /></div>
        <div><h3>Bordered Bold</h3></div>
        <Table content={{
          ...props,
          variant: 'bordered-bold'
        }} />
        <div><br /></div>
        <div><h3>Boxed</h3></div>
        <Table content={{
          ...props,
          variant: 'boxed'
        }} />
        <div><br /></div>
        <div><h3>Comparison</h3></div>
        <Table content={{
          ...props,
          variant: 'comparison'
        }} />
        <div><br /></div>
        <div><h3>Price</h3></div>
        <Table content={{
          ...props,
          variant: 'price'
        }} />
      </>
    )
  )
  .add(
    'Playground',
    () => (
      <div>
        <Table content={{ ...storyTable(), body: props.body }} />
      </div>
    )
  )
