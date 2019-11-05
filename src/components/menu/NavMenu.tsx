import * as React from 'react'
import { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import SbEditable from 'storyblok-react'
import { Link } from '@routes'
import { linkHandler, LinkPropsType, LinkType } from '../../utils/linkHandler'
// import CustomMenu from './CustomMenu'
import { NavMenuItemStoryblok, NavMenuStoryblok } from '../../typings/generated/components-schema'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/core/styles'
import Components from '@components'

import MenuItem from '@material-ui/core/MenuItem'

const Child: FunctionComponent<NavMenuItemStoryblok> = (nestedProps) => {
  const props: LinkPropsType = {}
  const link = nestedProps.link || {}
  linkHandler(props, link as LinkType, { openExternal: !!nestedProps.open_external })
  const to = props.to || props.href
  if (!to) {
    return (
      <MenuItem>
        {nestedProps.label}
      </MenuItem>
    )
  }
  return (
    <Link to={to}>
      <a>
        <MenuItem>
          {nestedProps.label}
        </MenuItem>
      </a>
    </Link>
  )
}

const useStyles = makeStyles({
  paper: (props: NavMenuStoryblok) => ({
    borderRadius: props.border_radius
  })
})

const NavMenu: FunctionComponent<{ content: NavMenuStoryblok }> = ({ content }) => {
  const classes = useStyles(content)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuItems = content.body || []
  const isCustom = menuItems.length && menuItems[0].component !== 'nav_menu_item'

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  let addons = {}

  if (content.alignment === 'bottomStart') {
    addons = {
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left'
      }
    }
  } else if (content.alignment === 'bottomEnd') {
    addons = {
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    }
  }
  return (
    <SbEditable content={content}>
      <>
        <Button endIcon={<Icon>expand_more</Icon>}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
          {content.title}
        </Button>
        <Menu open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorEl={anchorEl}
              classes={{
                paper: classes.paper
              }}
              {...addons}>
          {isCustom && menuItems.map(blok => Components(blok))}
          {!isCustom && (
            <div>
              {menuItems.map(nestedProps => <Child key={nestedProps._uid} {...nestedProps} />)}
            </div>
          )}
        </Menu>
      </>
    </SbEditable>
  )
}

export default NavMenu
