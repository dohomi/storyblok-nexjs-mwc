import {CollapsibleList, SimpleListItem} from '@rmwc/list'
import React from 'react'
import NavListItem from './NavListItem'

const CollapsedNavList = (content) => {
  const body = content && content.body || []
  const metaIcon = content.collapse_icon && content.collapse_icon.name || 'chevron_right'
  return (
    <CollapsibleList handle={<SimpleListItem text={content.header} metaIcon={metaIcon}/>}>
      {body.map((blok) => <NavListItem {...blok} key={blok._uid}/>)}
    </CollapsibleList>
  )
}

export default CollapsedNavList
