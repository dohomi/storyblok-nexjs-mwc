import SbEditable from 'storyblok-react'
import {CollapsibleList, SimpleListItem} from '@rmwc/list'
import Components from 'components'

const AccordionItem = (content) => {
  const metaIcon = content.metaIcon || 'chevron_right'
  return (
    <SbEditable content={content}>
      <CollapsibleList handle={<SimpleListItem text={content.title} metaIcon={metaIcon}/>}>
        {content.body.map(blok => Components(blok))}
      </CollapsibleList>
    </SbEditable>
  )
}

export default AccordionItem
