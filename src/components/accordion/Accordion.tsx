import SbEditable from 'storyblok-react'
import React, { useState } from 'react'
import { AccordionItemStoryblok, AccordionStoryblok } from '../../typings/generated/components-schema'
import { CoreComponentProps } from '../core/CoreComponentProps'

export type LmAccordionProps = CoreComponentProps & {
  content: AccordionStoryblok
}

export function LmAccordion({ content, ComponentRender }: LmAccordionProps): JSX.Element {
  const [opened, setOpen] = useState<string>('')
  console.log(ComponentRender, content)

  return (
    <SbEditable content={content}>
      <div className="lm-accordion">
        {(content.body || [])
          .map((blok: AccordionItemStoryblok, iteration) =>
            <ComponentRender content={blok}
                             options={content}
                             opened={opened}
                             setOpen={setOpen}
                             iteration={iteration}
                             key={blok._uid} />)}
      </div>
    </SbEditable>
  )
}
