import React, { FunctionComponent } from 'react'
import { NavItemStoryblok } from '../../typings/generated/components-schema'
import MuiLink from '@material-ui/core/Link'
import ContentLink from '../link/ContentLink'


const NavListItem: FunctionComponent<NavItemStoryblok> = (props) => {
  const content = { ...props }
  return (
    <ContentLink passHref={true} className={'lm-nav-link__item'} content={content}>
      <MuiLink>{content.name}</MuiLink>
    </ContentLink>
  )
}

export default NavListItem
