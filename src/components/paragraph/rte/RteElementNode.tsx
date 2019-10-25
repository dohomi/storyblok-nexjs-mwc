import * as React from 'react'
import { FunctionComponent } from 'react'
import RteContentRender from './RteContentRender'
import { RteProps } from './rte_typings'

const ElementMap = {
  'paragraph': 'p',
  'blockquote': 'blockquote',
  'bullet_list': 'ul',
  'list_item': 'li',
  'ordered_list': 'ol',
  'horizontal_rule': 'hr',
  'hard_break': 'br',
  // 'image': '',
  'code_block': 'code'
}

const RteSimpleRender: FunctionComponent<{ content: RteProps }> = ({ content }) => {
  return React.createElement(ElementMap[content.type], {}, content.content.map((blok, i) => RteContentRender(blok, i)))
}
export default RteSimpleRender
