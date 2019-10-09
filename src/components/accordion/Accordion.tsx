import SbEditable from 'storyblok-react'
import AccordionItem from './AccordionItem'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema'

const Accordion: FunctionComponent<{ content: AccordionStoryblok }> = ({ content }) => {
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <div className="lm-accordion">
        {body.map((blok: AccordionItemStoryblok) => <AccordionItem {...blok} key={blok._uid} />)}
      </div>
    </SbEditable>
  )
}

export default Accordion
