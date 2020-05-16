import * as React from 'react'
import { Accordion } from '../src/'
import { storyAccordion, storyAccordionItem } from '../.storybook/dummy/core/various'
import { get3ColumnsSection } from '../.storybook/dummy/section'

export default {
  title: 'Accordion'
}

export const Playground = () => (
  <Accordion content={{
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

