import {MenuItem, SimpleMenu} from '@rmwc/menu'
import {Button} from '@rmwc/button'
import SbEditable from 'storyblok-react'
import {Link} from 'routes/index'
import {componentLogger} from '../../utils/componentLogger'
import {linkHandler} from '../../utils/linkHandler'
import CustomMenu from './CustomMenu'


const Child = (nestedProps) => {
  const props = {}
  linkHandler(props, nestedProps.link, {openExternal: !!nestedProps.open_external})
  return props.to ? (
    <Link to={props.to}><a>{nestedProps.label}</a></Link>
  ) : (
    <a href={props.href}>{nestedProps.label}</a>
  )
}

const MtMenu = ({content}) => {
  componentLogger(content)
  const menuItems = content.body || []
  const isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item'
  if (isCustom) {
    return <CustomMenu content={content} />
  }
  return (
    <SbEditable content={content}>
      <SimpleMenu style={{borderRadius: `${content.border_radius || 4}px`}}
                  handle={<Button trailingIcon="expand_more">{content.title}</Button>}>
        {menuItems.map(nestedProps => (
          <MenuItem key={nestedProps._uid}>{Child(nestedProps)}</MenuItem>)
        )}
      </SimpleMenu>
    </SbEditable>
  )
}
export default MtMenu
