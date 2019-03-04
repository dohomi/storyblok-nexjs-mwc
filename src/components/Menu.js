import {MenuItem, SimpleMenu} from '@rmwc/menu'
import {Button} from '@rmwc/button'
import SbEditable from 'storyblok-react'
import {Link} from 'routes/index'

const Child = (nestedProps) => {
  if (nestedProps.link.linktype === 'story') {
    return (
      <Link route={`/${nestedProps.link.cached_url}`} prefetch>
        <a>
          {nestedProps.label}
        </a>
      </Link>
    )
  }
  return (
    <a href={nestedProps.link.cached_url}>{nestedProps.label}</a>
  )
}

const MtMenu = (props) => {
  const menuItems = props.content.body || []

  return (
    <SbEditable content={props.content}>
      <SimpleMenu handle={<Button>{props.content.title}</Button>}
                  theme={['']}>
        {menuItems.map(nestedProps => (
            <MenuItem key={nestedProps._uid}>{Child(nestedProps)}</MenuItem>
          )
        )}
      </SimpleMenu>
    </SbEditable>
  )
}
export default MtMenu
