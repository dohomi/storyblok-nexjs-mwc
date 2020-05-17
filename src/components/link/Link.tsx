import * as React from 'react'
import { LinkStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import ContentLink from './ContentLink'

export type LmLinkProps = { content: LinkStoryblok }

export function LmLink({ content }: LmLinkProps): JSX.Element {
  return (
    <ContentLink className={'lm-wrap-content__link'} content={content}>
      {(content.body || []).map(blok => Components(blok))}
    </ContentLink>
  )
}

