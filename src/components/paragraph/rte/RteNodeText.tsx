import { RteContentProps } from './rte_typings'
import * as React from 'react'
import { FunctionComponent } from 'react'
import clsx from 'clsx'
import { Link } from 'routes'

const InlineClassMapping = {
  bold: 'font-weight-bold',
  strike: 'text-decoration-line-through',
  underline: 'text-decoration-underline',
  strong: 'font-weight-bolder',
  code: 'text-code',
  italic: 'font-italic',
  link: 'text-link',
  styled: ''
}

const RteNodeText: FunctionComponent<{ content: RteContentProps }> = ({ content }) => {
  if (content.marks && content.marks.length) {
    const link = content.marks.find(({ type }) => type === 'link')
    const className = clsx(content.marks.map(({ type, attrs }) => {
      if (attrs && attrs.class) {
        return attrs.class
      }
      return InlineClassMapping[type]
    }))
    if (link) {
      return <Link to={link.attrs && link.attrs.href}><a>{content.text}</a></Link>
    }
    return <span className={className}>{content.text}</span>
  }
  return <>{content.text}</>
}
export default RteNodeText
