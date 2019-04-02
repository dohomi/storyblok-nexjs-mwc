import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import {Link} from 'routes/index'
import {linkHandler} from '../utils/linkHandler'

const NavListItem = (props) => {
  const content = props
  linkHandler(content, content.link, {openExternal: !!props.open_external})
  return content.to ? (
    <Link to={content.to} key={props._uid}><a className="nav-link">{content.name}</a></Link>
  ) : (
    <a href={content.href} className="nav-link" key={props._uid}>{content.name}</a>
  )
}

const NavList = (props) => {
  const content = props.content
  const body = content && content.body || []
  const properties = content.properties || []
  const header = content.header
  const navClassNames = clsx(content.style, 'nav', properties)
  return (
    <SbEditable content={content}>
      {header && <h4>{header}</h4>}
      <nav className={navClassNames}>
        {body.map((blok) =>
          NavListItem(blok)
        )}
      </nav>
    </SbEditable>
  )
}

export default NavList
