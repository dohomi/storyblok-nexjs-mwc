import SbEditable from 'storyblok-react'
import { CollapsibleList, SimpleListItem } from '@rmwc/list'
import Components from '@components'
import { FunctionComponent } from 'react'
import { AccordionItemStoryblok } from '../../typings/generated/components-schema'

const AccordionItem: FunctionComponent<AccordionItemStoryblok> = (content) => {
  const metaIcon = content.metaIcon || 'chevron_right'
  const body = content.body || []
  return (
    <SbEditable content={content}>
      <CollapsibleList handle={<SimpleListItem text={content.title} metaIcon={metaIcon} />}>
        {body.map(blok => Components(blok))}
      </CollapsibleList>
    </SbEditable>
  )
}

export default AccordionItem
