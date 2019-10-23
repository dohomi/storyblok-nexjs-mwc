import { FunctionComponent } from 'react'
import { LinkStoryblok } from '../../typings/generated/components-schema'
import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
import { Link } from 'routes'
import Components from 'components'

const LinkWwrap: FunctionComponent<{ content: LinkStoryblok }> = ({ content }) => {
  const linkProps: LinkPropsType = {}
  // console.log(content.link)
  linkHandler(linkProps as LinkPropsType, content.link as LinkType, { openExternal: !!content.open_external })
  const body = content.body || []
  if (linkProps.to) {
    return <Link {...linkProps}><a>{body.map(blok => Components(blok))}</a></Link>
  }
  return <a {...linkProps}>{body.map(blok => Components(blok))}</a>
}

export default LinkWwrap
