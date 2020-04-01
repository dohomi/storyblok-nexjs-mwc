import { RteContentProps } from './rte_typings'
import * as React from 'react'
import { FunctionComponent } from 'react'
import clsx from 'clsx'
import MuiLink from '@material-ui/core/Link'
import { getLinkAttrs } from '../../../utils/linkHandler'
import MuiNextLink, { LinkProps } from '../../link/MuiNextLink'
import { CONFIG } from '../../../utils/config'

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
      const { rel, target, external, ...rest } = getLinkAttrs({
        cached_url: link.attrs.href,
        linktype: link.attrs.linktype
      }, {})
      if (external) {
        return (
          <MuiLink href={rest.href as string} rel={rel} target={target}>{content.text}</MuiLink>
        )
      }
      const props: Partial<LinkProps> = {}
      if (!CONFIG.prefetch) {
        props.prefetch = false
      }
      return (
        <MuiNextLink href="/[...index]" as={rest.href} rel={rel} target={target} {...props}>
          {content.text}
        </MuiNextLink>
      )
    }
    return <span className={className}>{content.text}</span>
  }
  return <>{content.text}</>
}
export default RteNodeText
