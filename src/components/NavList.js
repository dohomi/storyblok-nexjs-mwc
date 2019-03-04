import SbEditable from 'storyblok-react'
import clsx from 'clsx'
import {Link} from '../routes'

const NavListItem = (props) => {
  const content = props
  const link = content.link
  const label = content.name
  return (
    <Link key={props._uid} route={`/${link.cached_url}`}>
      <a className="nav-link">
        {label}
      </a>
    </Link>
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
