import { default as React, FunctionComponent } from 'react'
import { getLinkAttrs, LinkType } from '../../utils/linkHandler'
import SbEditable from 'storyblok-react'
import Link, { LinkProps } from 'next/link'
import MuiNextLink from './MuiNextLink'
import {
  ButtonStoryblok,
  CardListItemStoryblok,
  LinkStoryblok,
  NavItemStoryblok,
  TimelineItemStoryblok
} from '../../typings/generated/components-schema'
import { CONFIG } from '../../utils/config'

const ContentLink: FunctionComponent<{
  className: string
  content: ButtonStoryblok | CardListItemStoryblok | LinkStoryblok | NavItemStoryblok | TimelineItemStoryblok
  passHref?: boolean
  isMuiLink?: boolean
}> = ({ children, className, content, passHref, isMuiLink }) => {
  if (content.link) {
    const { rel, target, external, ...attrs } = getLinkAttrs(content.link as LinkType, { openExternal: !!content.open_external })

    if (attrs.href) {
      if (external) {
        return (
          <SbEditable content={content}>
            {isMuiLink ? (
              <MuiNextLink href={attrs.href as string} rel={rel} target={target} className={className}>
                {children}
              </MuiNextLink>
            ) : (
              <a href={attrs.href as string} rel={rel} target={target} className={className}>{children}</a>
            )}
          </SbEditable>
        )
      }
      const props: Partial<LinkProps> = {}
      if (!CONFIG.prefetch) {
        props.prefetch = false
      }
      if (isMuiLink) {
        return (
          <SbEditable content={content}>
            <MuiNextLink href="/[...index]" as={attrs.href} {...props}>
              {children}
            </MuiNextLink>
          </SbEditable>
        )
      }
      return (
        <SbEditable content={content}>
          {!passHref && (
            <Link {...attrs} href="/[...index]" as={attrs.href} {...props}>
              <a rel={rel} target={target} className={className}>{children}</a>
            </Link>
          )}
          {passHref && (
            <Link {...attrs} href="/[...index]" as={attrs.href} passHref {...props}>
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
