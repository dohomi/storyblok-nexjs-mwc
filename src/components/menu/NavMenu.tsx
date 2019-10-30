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
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Components from '@components'


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
          {!isCustom && menuItems.map(nestedProps => (
            <MenuItem key={nestedProps._uid}>
              {Child(nestedProps)}
            </MenuItem>)
          )}
        </Menu>
      </>
    </SbEditable>
  )
}

export default NavMenu
