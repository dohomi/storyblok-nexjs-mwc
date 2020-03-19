import SbEditable from 'storyblok-react'
import React, { FunctionComponent } from 'react'
import { ToolbarNaviButtonStoryblok } from '../../../typings/generated/components-schema'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import { toggleLeftNavigation } from '../../../utils/state/actions'
import LmIcon from '../../icon/LmIcon'
import { Menu as MenuUi } from 'mdi-material-ui'


const ToggleDrawerButton: FunctionComponent<{ content: ToolbarNaviButtonStoryblok }> = ({ content }) => {
  // TODO need to specify drawer (left/right..)
  return (
    <SbEditable content={content}>
      <IconButton className={clsx(content.class_names && content.class_names.values)}
                  style={{
                    width: 'max-content'
                  }}
                  onClick={() => toggleLeftNavigation()}>
        {content.icon && content.icon.name ? <LmIcon iconName={content.icon.name} /> : <MenuUi />}
      </IconButton>
    </SbEditable>
  )
}

export default ToggleDrawerButton
