import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../../typings/generated/components-schema'
import MenuItem from '@material-ui/core/MenuItem'
import ContentLink from '../../link/ContentLink'

const DrawerButton: FunctionComponent<{content: ButtonStoryblok}> = (props) => {
  const {content} = props
  const buttonProps = {
    text: content.label || content.name,
    graphic: content.icon && content.icon.name
  }

  return (
    <ContentLink content={content} className="lm-drawer__link" passHref={true}>
      <MenuItem button>
        {buttonProps.text}
      </MenuItem>
    </ContentLink>
  )
}

export default DrawerButton
