import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
import { Link } from '@routes'
import { FunctionComponent } from 'react'
import { CardListItemStoryblok } from '../../typings/generated/components-schema'

const CardLink: FunctionComponent<CardListItemStoryblok> = (props) => {
  if (!(props.link && props.link.cached_url)) {
    return <>{props.children}</>
  }
  const content = { ...props }
  linkHandler(content as LinkPropsType, content.link as LinkType || {}, { openExternal: props.open_external })
  const linkProps = content as LinkPropsType
  return linkProps.to ? (
    <Link to={linkProps.to} passHref>{props.children}</Link>
  ) : (
    <a href={linkProps.href}>{props.children}</a>
  )
}

export default CardLink
