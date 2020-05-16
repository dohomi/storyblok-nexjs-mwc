import SbEditable from 'storyblok-react'
import { AccordionItem } from './AccordionItem'
import React, { useState } from 'react'
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema'

export type AccordionProps = {
  content: AccordionStoryblok
}

export function Accordion({ content }: AccordionProps): JSX.Element {
  const [opened, setOpen] = useState<string>('')

  return (
    <SbEditable content={content}>
      <div className="lm-accordion">
        {(content.body || []).map((blok: AccordionItemStoryblok, iteration) => <AccordionItem content={blok}
                                                                                              options={content}
                                                                                              opened={opened}
                                                                                              setOpen={setOpen}
                                                                                              iteration={iteration}
                                                                                              key={blok._uid} />)}
      </div>
    </SbEditable>
  )
}
