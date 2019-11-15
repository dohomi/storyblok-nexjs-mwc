import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../../typings/generated/components-schema'
import MenuItem from '@material-ui/core/MenuItem'
import ContentLink from '../../link/ContentLink'

const DrawerButton: FunctionComponent<ButtonStoryblok> = (props) => {
  const buttonProps = {
    text: props.label || props.name,
    graphic: props.icon && props.icon.name
  }

  return (
    <ContentLink content={props} className="lm-drawer__link" passHref={true}>
      <MenuItem button>
        {buttonProps.text}
      </MenuItem>
    </ContentLink>
  )
}

export default DrawerButton
