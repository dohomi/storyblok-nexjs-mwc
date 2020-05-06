import SbEditable from 'storyblok-react'
import Components from '@components'
import { default as React, FunctionComponent } from 'react'
import { AccordionItemStoryblok } from '../../typings/generated/components-schema'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Plus from 'mdi-material-ui/Plus'

const AccordionItem: FunctionComponent<AccordionItemStoryblok> = (content) => {

  return (
    <SbEditable content={content}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={content.use_plus_icon ? <Plus /> : <ChevronDown />}>
          <Typography>{content.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            {(content.body || []).map(blok => Components(blok))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </SbEditable>
  )
}

export default AccordionItem
