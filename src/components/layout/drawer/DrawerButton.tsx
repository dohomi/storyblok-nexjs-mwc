import * as React from 'react'
import { FunctionComponent } from 'react'
import { ButtonStoryblok } from '../../../typings/generated/components-schema'
import ContentLink from '../../link/ContentLink'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LmIcon from '../../icon/LmIcon'

const DrawerButton: FunctionComponent<{ content: ButtonStoryblok }> = (props) => {
  const { content } = props
  const buttonProps = {
    text: content.label || content.name,
    graphic: content.icon?.name
  }

  return (
    <ContentLink content={content} className="lm-drawer__link" passHref={true}>
      <ListItem button>
        {buttonProps.graphic && (
          <ListItemIcon>
            <LmIcon iconName={buttonProps.graphic} style={{
              width: '1.5rem',
              height: '1.5rem'
            }} />
          </ListItemIcon>
        )}
        <ListItemText primary={buttonProps.text} />
      </ListItem>
    </ContentLink>
  )
}

export default DrawerButton
