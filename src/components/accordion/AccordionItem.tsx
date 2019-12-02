import SbEditable from 'storyblok-react'
import Components from '@components'
import { default as React, FunctionComponent } from 'react'
import { AccordionItemStoryblok } from '../../typings/generated/components-schema'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { ChevronDown, Plus } from 'mdi-material-ui'

const AccordionItem: FunctionComponent<AccordionItemStoryblok> = (content) => {

  return (
    <SbEditable content={content}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={content.use_plus_icon ? <Plus /> : <ChevronDown />}>
          <Typography>{content.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {Array.isArray(content.body) && content.body.map(blok => Components(blok))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </SbEditable>
  )
}

export default AccordionItem
