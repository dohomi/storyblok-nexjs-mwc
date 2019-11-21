import { default as React, FunctionComponent } from 'react'
import { getLinkAttrs, LinkType } from '../../utils/linkHandler'
import SbEditable from 'storyblok-react'
import Link from 'next/link'

const ContentLink: FunctionComponent<{
  className: string
  content: any
  passHref?: boolean
}> = ({ children, className, content, passHref }) => {
  if (content.link) {
    const { rel, target, external, ...attrs } = getLinkAttrs(content.link as LinkType, { openExternal: !!content.open_external })
    if (attrs.href) {
      if (external) {
        return (
          <SbEditable content={content}>
            <a href={attrs.href as string} rel={rel} target={target} className={className}>{children}</a>
          </SbEditable>
        )
      }
      return (
        <SbEditable content={content}>
          {!passHref && (
            <Link {...attrs} href="/[...index]" as={attrs.href}>
              <a rel={rel} target={target} className={className}>{children}</a>
            </Link>
          )}
          {passHref && (
            <Link {...attrs} href="/[...index]" as={attrs.href} passHref>
              {children}
            </Link>
          )}
        </SbEditable>
      )
    }
  }
  return (
    <SbEditable content={content}>
      {children}
    </SbEditable>
  )
}

export default ContentLink
