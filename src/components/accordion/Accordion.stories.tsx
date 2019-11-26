import { storiesOf } from '@storybook/react'
import Accordion from './Accordion'
import * as React from 'react'
import { storyAccordion, storyAccordionItem } from '../../../.storybook/dummy/core/various'
import { get3ColumnsSection } from '../../../.storybook/dummy/section'


storiesOf('Accordion', module)
  .add(
    'Accordion',
    () => (
      <Accordion content={{
        ...storyAccordion(),
        body: [{
          ...storyAccordionItem({ count: 1 }),
          body: [
            get3ColumnsSection({ count: 1 })
          ]
        }, {
          ...storyAccordionItem({ count: 2 }),
          body: [
            get3ColumnsSection({ count: 2 })
          ]
        }]
      }} />
    )
  )
