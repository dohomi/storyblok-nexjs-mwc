import {MenuItem, SimpleMenu} from '@rmwc/menu'
import {Button} from '@rmwc/button'
import SbEditable from 'storyblok-react'
import {Link} from 'routes/index'
import {componentLogger} from '../utils/componentLogger'
import {linkHandler} from '../utils/linkHandler'


const Child = (nestedProps) => {
  const props = {}
  linkHandler(props,nestedProps.link)
  return props.to ? (
    <Link to={props.to}><a>{nestedProps.label}</a></Link>
  ) : (
    <a href={props.href}>{nestedProps.label}</a>
  )
}

const MtMenu = ({content}) => {
  componentLogger(content)
  const menuItems = content.body || []
  return (
    <SbEditable content={content}>
      <SimpleMenu style={{borderRadius:`${content.border_radius || 4}px`}}
        handle={<Button trailingIcon="expand_more">{content.title}</Button>}
                  theme={['']}>
        {menuItems.map(nestedProps => (
          <MenuItem key={nestedProps._uid}>{Child(nestedProps)}</MenuItem>)
        )}
      </SimpleMenu>
    </SbEditable>
  )
}
export default MtMenu
