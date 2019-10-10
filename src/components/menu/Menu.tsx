import * as React from 'react'
import { FunctionComponent } from 'react'
import { MenuItem, SimpleMenu } from '@rmwc/menu'
import { Button } from '@rmwc/button'
import SbEditable from 'storyblok-react'
import { Link } from 'routes'
import { componentLogger } from '../../utils/componentLogger'
import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
import CustomMenu from './CustomMenu'
import { NavMenuItemStoryblok, NavMenuStoryblok } from '../../typings/generated/components-schema'


const Child: FunctionComponent<NavMenuItemStoryblok> = (nestedProps) => {
  const props: LinkPropsType = {}
  const link = nestedProps.link || {}
  linkHandler(props, link as LinkType, { openExternal: !!nestedProps.open_external })
  return props.to ? (
    <Link to={props.to}><a>{nestedProps.label}</a></Link>
  ) : (
    <a href={props.href}>{nestedProps.label}</a>
  )
}

const MtMenu: FunctionComponent<{ content: NavMenuStoryblok }> = ({ content }) => {
  componentLogger(content)
  const menuItems = content.body || []
  const isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item'
  if (isCustom) {
    return <CustomMenu content={content} />
  }
  const borderRadius = typeof content.border_radius === 'number' ? content.border_radius : 4

  return (
    <SbEditable content={content}>
      { // bug of rmwc
        // @ts-ignore
        <SimpleMenu
          style={{ borderRadius: `${borderRadius}px` }}
          handle={<Button trailingIcon="expand_more">{content.title}</Button>}
        >
          {menuItems.map(nestedProps => (
            <MenuItem key={nestedProps._uid}>
              {Child(nestedProps)}
            </MenuItem>)
          )}
        </SimpleMenu>}
    </SbEditable>
  )
}
export default MtMenu
