import * as React from 'react'
import { FunctionComponent } from 'react'
import { LinkStoryblok } from '../../typings/generated/components-schema'
import Components from '@components'
import ContentLink from './ContentLink'

const LinkWwrap: FunctionComponent<{ content: LinkStoryblok }> = ({ content }) => {
  const body = content.body || []

  return (
    <ContentLink className={'lm-wrap-content__link'} content={content}>
      {body.map(blok => Components(blok))}
    </ContentLink>
  )
}

export default LinkWwrap
