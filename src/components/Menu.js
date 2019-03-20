import {MenuItem, SimpleMenu} from '@rmwc/menu'
import {Button} from '@rmwc/button'
import SbEditable from 'storyblok-react'
import {Link} from 'routes/index'
import {componentLogger} from '../utils/componentLogger'


const Child = (nestedProps) => {
  const isInternalLink = nestedProps.link && nestedProps.link.linktype === 'story'
  const href = nestedProps.link && `/${nestedProps.link.cached_url}`
  return isInternalLink ? (
    <Link to={href}><a>{nestedProps.label}</a></Link>
  ) : (
    <a href={href}>{nestedProps.label}</a>
  )
}

const MtMenu = (props) => {
  const content = props.content
  componentLogger(content)
  const menuItems = content.body || []
  return (
    <SbEditable content={content}>
      <SimpleMenu handle={<Button trailingIcon="expand_more">{props.content.title}</Button>}
                  theme={['']}>
        {menuItems.map(nestedProps => (
          <MenuItem key={nestedProps._uid}>{Child(nestedProps)}</MenuItem>)
        )}
      </SimpleMenu>
    </SbEditable>
  )
}
export default MtMenu
