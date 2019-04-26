import {linkHandler} from '../../utils/linkHandler'
import {Link} from 'routes/index'
import SbEditable from 'storyblok-react'

const NavListItem = (props) => {
  const content = {...props}
  linkHandler(content, content.link, {openExternal: !!props.open_external})
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
