import { getLinkAttrs, LinkType } from '../../utils/linkHandler'
import { Link } from '@routes'
import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import { NavItemStoryblok } from '../../typings/generated/components-schema'
import MuiLink from '@material-ui/core/Link'


const NavListItem: FunctionComponent<NavItemStoryblok> = (props) => {
  const content = { ...props }
  const {rel,target, ...attrs} = getLinkAttrs(props.link as LinkType , { openExternal: !!props.open_external })
  return (
    <SbEditable content={content}>
      <Link passHref {...attrs}>
        <MuiLink rel={rel} target={target}>{content.name}</MuiLink>
      </Link>
    </SbEditable>
  )
}

export default NavListItem
