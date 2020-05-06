import SbEditable from 'storyblok-react'
import AccordionItem from './AccordionItem'
import React, { FunctionComponent } from 'react'
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema'

const Accordion: FunctionComponent<{ content: AccordionStoryblok }> = ({ content }) => {
  return (
    <SbEditable content={content}>
      <div className="lm-accordion">
        {(content.body || []).map((blok: AccordionItemStoryblok) => <AccordionItem {...blok} key={blok._uid} />)}
      </div>
    </SbEditable>
  )
}

export default Accordion
