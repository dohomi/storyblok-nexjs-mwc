import * as React from 'react'
import { LinkStoryblok } from '../../typings/generated/components-schema'
import ContentLink from './ContentLink'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LmLinkProps = CoreComponentProps & { content: LinkStoryblok }

export function LmLink({ content, ComponentRender }: LmLinkProps): JSX.Element {
  return (
    <ContentLink className={'lm-wrap-content__link'} content={content}>
      {(content.body || []).map(blok => <ComponentRender content={blok} />)}
    </ContentLink>
  )
}

