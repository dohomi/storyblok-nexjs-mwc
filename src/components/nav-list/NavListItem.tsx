import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
import { Link } from '@routes'
import SbEditable from 'storyblok-react'
import { FunctionComponent } from 'react'
import { NavItemStoryblok } from '../../typings/generated/components-schema'

const NavListItem: FunctionComponent<NavItemStoryblok> = (props) => {
  const content = { ...props }
  linkHandler(content as LinkPropsType, props.link as LinkType || {}, { openExternal: !!props.open_external })
  return (
    <SbEditable content={content}>
      {content.to ? (
        <Link to={content.to}><a className="nav-link">{content.name}</a></Link>
      ) : (
        <a href={content.href} className="nav-link">{content.name}</a>
      )}
    </SbEditable>
  )
}

export default NavListItem
