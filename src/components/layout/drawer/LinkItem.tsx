import { linkHandler, LinkPropsType, LinkType } from '../../../utils/linkHandler'
import { Link } from '@routes'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../../typings/generated/components-schema'

const LinkItem: FunctionComponent<ButtonStoryblok> = (props) => {
  const content = { ...props }
  linkHandler(content as LinkPropsType, content.link as LinkType || {}, { openExternal: !!props.open_external })
  return content.to ? (
    <Link to={content.to}><a>{props.children}</a></Link>
  ) : (
    <a href={content.href}>{props.children}</a>
  )
}

export default LinkItem
