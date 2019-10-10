import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
import { Link } from 'routes'
import { FunctionComponent } from 'react'
import { CardListItemProps } from './CardLinkActionTitle'

const CardLink: FunctionComponent<CardListItemProps> = (props) => {
  if (!(props.link && props.link.cached_url)) {
    return <>{props.children}</>
  }
  const content = { ...props }
  linkHandler(content as LinkPropsType, content.link as LinkType || {}, { openExternal: !!props.open_external })
  return content.to ? (
    <Link to={content.to}><a>{content.children}</a></Link>
  ) : (
    <a href={content.href}>{content.children}</a>
  )
}

export default CardLink
