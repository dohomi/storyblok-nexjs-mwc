import {linkHandler} from '../../../utils/linkHandler'
import {Link} from 'routes'

const LinkItem = (props) => {
  const content = {...props}
  linkHandler(content, content.link, {openExternal: !!props.open_external})
  return content.to ? (
    <Link to={content.to}><a>{props.children}</a></Link>
  ) : (
    <a href={content.href}>{props.children}</a>
  )
}

export default LinkItem
