import { default as React, FunctionComponent } from 'react'
import { getLinkAttrs, LinkType } from '../../utils/linkHandler'
import SbEditable from 'storyblok-react'
import Link from 'next/link'
import MuiNextLink from './MuiNextLink'
import {
  ButtonStoryblok,
  CardListItemStoryblok,
  LinkStoryblok,
  NavItemStoryblok,
  TimelineItemStoryblok
} from '../../typings/generated/components-schema'

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
      if (isMuiLink) {
        console.log('is inside Mui LInk', isMuiLink)
        return (
          <SbEditable content={content}>
            <MuiNextLink href="/[...index]" as={attrs.href}>
              {children}
            </MuiNextLink>
          </SbEditable>
        )
      }
      return (
        <SbEditable content={content}>
          {!passHref && (
            <Link {...attrs} href="/[...index]" as={attrs.href} prefetch={false}>
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
