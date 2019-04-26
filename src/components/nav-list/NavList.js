import clsx from 'clsx'
import NavListItem from './NavListItem'

const NavList = (content) => {
  const body = content && content.body || []
  const properties = content.properties || []
  const header = content.header
  const navClassNames = clsx(content.style, 'nav', properties)
  return (
    <>
      {header && <h4 className="nav-list__header">{header}</h4>}
      <nav className={navClassNames}>
        {body.map((blok) => <NavListItem {...blok} key={blok._uid}/>)}
      </nav>
    </>
  )
}

export default NavList
