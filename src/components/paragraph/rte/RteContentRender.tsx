import React from 'react'
import RteText from './RteNodeText'
import RteNode from './RteNode'

const RteComponents = {
  'heading': RteNode,
  'text': RteText,
  'paragraph': RteNode,
  'blockquote': RteNode,
  'bullet_list': RteNode,
  'list_item': RteNode,
  'ordered_list': RteNode,
  'horizontal_rule': () => (<hr />),
  'hard_break': RteNode,
  'image': RteNode,
  'code_block': RteNode
}

export default (blok: any, i: number) => {
  if (typeof RteComponents[blok.type] !== 'undefined') {
    return React.createElement(RteComponents[blok.type], { content: blok, key: `${blok.type}_${i}` })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.type} {i} has not been created yet.</div>
  ), { key: `${blok.type}_${i}` })
}
