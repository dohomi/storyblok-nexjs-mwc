import * as React from 'react'
import { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import SbEditable from 'storyblok-react'
import { NavMenuStoryblok } from '../../typings/generated/components-schema'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/core/styles'
import Components from '@components'

import MenuItem from '@material-ui/core/MenuItem'
import ContentLink from '../link/ContentLink'

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
  const expandIcon = (content.icon && content.icon.name) || 'expand_more'
  const closeIcon = (content.icon_collapse && content.icon_collapse.name) || 'expand_less'
  return (
    <SbEditable content={content}>
      <>
        <Button endIcon={<Icon>{Boolean(anchorEl) ? closeIcon : expandIcon}</Icon>}
                aria-controls="simple-menu"
                aria-haspopup="true"
                className="lm-default-color"
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
              {menuItems.map(nestedProps => (
                <ContentLink key={nestedProps._uid} className={'lm-nav-men__link'} content={nestedProps}>
                  <MenuItem>
                    {nestedProps.label}
                  </MenuItem>
                </ContentLink>
              ))}
            </div>
          )}
        </Menu>
      </>
    </SbEditable>
  )
}

export default NavMenu
