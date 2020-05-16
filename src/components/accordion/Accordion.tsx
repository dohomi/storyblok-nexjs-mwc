import SbEditable from 'storyblok-react'
import { LmAccordionItem } from './AccordionItem'
import React, { useState } from 'react'
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema'

export type LmAccordionProps = {
  content: AccordionStoryblok
}

export function LmAccordion({ content }: LmAccordionProps): JSX.Element {
  const [opened, setOpen] = useState<string>('')

  return (
    <SbEditable content={content}>
      <div className="lm-accordion">
        {(content.body || [])
          .map((blok: AccordionItemStoryblok, iteration) =>
            <LmAccordionItem content={blok}
                           options={content}
                           opened={opened}
                           setOpen={setOpen}
                           iteration={iteration}
                           key={blok._uid} />)}
      </div>
    </SbEditable>
  )
}
