import Button, { ButtonProps } from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../typings/generated/components-schema'
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton'
import SbEditable from 'storyblok-react'

const LmMuiButton: FunctionComponent<{ content: ButtonStoryblok }> = ({ content }) => {
  if (content.variant === 'fab') {
    return (
      <SbEditable content={content}>
        <Fab variant={content.label ? 'extended' : undefined}
             color={content.color as ButtonProps['color']}>
          {content.icon && content.icon.name && <Icon>{content.icon.name}</Icon>}
          {content.label}
        </Fab>
      </SbEditable>
    )
  }
  if (content.icon && content.icon.name && !content.label) {
    return (
      <SbEditable content={content}>
        <IconButton color={content.color as IconButtonProps['color']}>
          <Icon>{content.icon && content.icon.name}</Icon>
        </IconButton>
      </SbEditable>
    )
  }
  return (
    <SbEditable content={content}>
      <Button size={'large'}
              variant={'outlined'}
              color={content.color as ButtonProps['color']}
              startIcon={content.icon && content.icon.name && <Icon>{content.icon && content.icon.name}</Icon>}>
        {content.label}
      </Button>
    </SbEditable>
  )
}
export default LmMuiButton
