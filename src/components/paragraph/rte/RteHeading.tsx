import * as React from 'react'
import { FunctionComponent } from 'react'
import RteContentRender from './RteContentRender'
import { RteProps } from './rte_typings'


const RteHeading: FunctionComponent<{ content: RteProps }> = ({ content }) => {
  return React.createElement(`h${content.attrs.level || '3'}`, {}, content.content.map((blok, i) => RteContentRender(blok, i)))
}
export default RteHeading
