import { default as React, FunctionComponent } from 'react'
import { getLinkAttrs, LinkType } from '../../utils/linkHandler'
import SbEditable from 'storyblok-react'
import { Link } from '@routes'

const ContentLink: FunctionComponent<{
  className: string
  content: any
  passHref?: boolean
}> = ({ children, className, content, passHref }) => {
  if (content.link) {
    const { rel, target, ...attrs } = getLinkAttrs(content.link as LinkType, { openExternal: !!content.open_external })

    if (attrs.href) {
      return (
        <SbEditable content={content}>
          {/*{attrs.href && <a {...attrs} rel={rel} target={target} className={className}>{children}</a>}*/}
          {!passHref && (
            <Link {...attrs} as={attrs.href}>
              <a rel={rel} target={target} className={className}>{children}</a>
            </Link>
          )}
          {passHref && (
            <Link {...attrs} as={attrs.href} passHref>
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
