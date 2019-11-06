import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../../typings/generated/components-schema'
import { linkHandler, LinkPropsType, LinkType } from '../../../utils/linkHandler'
import { Link } from '@routes'
import MenuItem from '@material-ui/core/MenuItem'

const DrawerButton: FunctionComponent<ButtonStoryblok> = (props) => {
  const buttonProps = {
    text: props.label || props.name,
    graphic: props.icon && props.icon.name
  }

  const content = { ...props }
  linkHandler(content as LinkPropsType, content.link as LinkType || {}, { openExternal: !!props.open_external })
  const to = content.to || content.href

  return (
    <Link passHref to={to}>
      <MenuItem>
        {buttonProps.text}
      </MenuItem>
    </Link>
  )
}

export default DrawerButton
