import SbEditable from 'storyblok-react'
import Components from '@components'
import { default as React, useState } from 'react'
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Plus from 'mdi-material-ui/Plus'

type AccordionItemProps = {
  content: AccordionItemStoryblok,
  options: AccordionStoryblok,
  opened: string,
  setOpen: Function,
  iteration: number
}

export function AccordionItem({ content, options, setOpen, opened, iteration }: AccordionItemProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<string>('')

  const handleChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
    options.restrict_one ? setOpen(isExpanded ? panel : '') : setIsOpen(isExpanded ? panel : '')
  }
  const panelKey = `panel-${iteration}`
  const expanded = options.restrict_one ? opened === panelKey : isOpen === panelKey
  return (
    <SbEditable content={content}>
      <ExpansionPanel square={options.square ? true : false}
                      expanded={expanded}
                      onChange={handleChange(panelKey)}>
        <ExpansionPanelSummary expandIcon={(content.use_plus_icon || options.use_plus) ? <Plus /> : <ChevronDown />}>
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
