import RteHeading from './RteHeading'
import React from 'react'
import RteText from './RteText'
import RteElementNode from './RteElementNode'

const RteComponents = {
  'heading': RteHeading,
  'text': RteText,
  'paragraph': RteElementNode,
  'blockquote': RteElementNode,
  'bullet_list': RteElementNode,
  'list_item': RteElementNode,
  'ordered_list': RteElementNode,
  'horizontal_rule': () => (<hr/>),
  'hard_break': RteElementNode,
  'image': RteElementNode,
  'code_block': RteElementNode
}

export default (blok: any, i: number) => {
  if (typeof RteComponents[blok.type] !== 'undefined') {
    return React.createElement(RteComponents[blok.type], { content: blok, key: `${blok.type}_${i}` })
  }
  return React.createElement(() => (
    <div style={{ color: 'red' }}>The component {blok.type} has not been created yet.</div>
  ), { key: blok._uid })
}
