import * as React from 'react'
import { LmAccordion } from '../src/'
import { storyAccordion, storyAccordionItem } from '../src/storybook/core/various'
import { get3ColumnsSection } from '../src/storybook/section'

export default {
  title: 'Accordion'
}

export const Playground = () => (
  <LmAccordion content={{
    ...storyAccordion(),
    body: [{
      ...storyAccordionItem({ count: 1 }),
      body: [
        get3ColumnsSection({ count: 1, knob: 'Column Content' })
      ]
    }, {
      ...storyAccordionItem({ count: 2 }),
      body: [
        get3ColumnsSection({ count: 2, knob: 'Column Content' })
      ]
    }]
  }} />
)

