import React, { FunctionComponent } from 'react'
import { NavItemStoryblok } from '../../typings/generated/components-schema'
import ContentLink from '../link/ContentLink'


const NavListItem: FunctionComponent<NavItemStoryblok> = (props) => {
  const content = { ...props }

  return (
    <ContentLink isMuiLink={true} className={'lm-nav-link__item'} content={content}>
      {content.name}
    </ContentLink>
  )
}

export default NavListItem
