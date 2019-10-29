import * as React from 'react'
import { FunctionComponent } from 'react'
import { MenuItem, SimpleMenu } from '@rmwc/menu'
import { Button } from '@rmwc/button'
import SbEditable from 'storyblok-react'
import { Link } from '@routes'
import { componentLogger } from '../../utils/componentLogger'
import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
import CustomMenu from './CustomMenu'
import { NavMenuItemStoryblok, NavMenuStoryblok } from '../../typings/generated/components-schema'
import clsx from 'clsx'


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

const NavMenu: FunctionComponent<{ content: NavMenuStoryblok }> = ({ content }) => {
  componentLogger(content)
  const menuItems = content.body || []
  const isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item'
  if (isCustom) {
    return <CustomMenu content={content} />
  }

  let borderRadius = '4px'
  if (content.border_radius) {
    // @ts-ignore
    if (typeof content.border_radius === 'number') {
      // was number before..
      borderRadius = `${content.border_radius}px`
    } else {
      borderRadius = content.border_radius
    }
  }

  return (
    <SbEditable content={content}>
      { // bug of rmwc
        // @ts-ignore
        <SimpleMenu
          rootProps={{
            className: clsx('lm-nav-menu', {
                [`lm-${content.alignment}`]: !!content.alignment
              },
              content.class_names && content.class_names.values)
          }}
          style={{ borderRadius: borderRadius }}
          anchorCorner={content.alignment || 'topStart'}
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
export default NavMenu
