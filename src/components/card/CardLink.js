import {linkHandler} from '../../utils/linkHandler'
import {Link} from 'routes/index'

const CardLink = (props) => {
  if (!(props.link && props.link.cached_url)) {
    return <>{props.children}</>
  }
  const content = {...props}
  linkHandler(content, content.link, {openExternal: !!props.open_external})
  return content.to ? (
    <Link to={content.to}><a>{content.children}</a></Link>
  ) : (
    <a href={content.href}>{content.children}</a>
  )
}

export default CardLink