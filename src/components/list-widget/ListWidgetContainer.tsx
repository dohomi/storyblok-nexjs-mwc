import SbEditable from 'storyblok-react'
import ListWidgetLists from './ListWidgetLists'
import ListWidgetCards from './ListWidgetCards'
import * as React from 'react'
import { FunctionComponent } from 'react'
import { CardListStoryblok, ListsStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema'
import { PageItem } from '../../typings/generated/schema'

const ListWidgetContainer: FunctionComponent<{
  listOption: (ListsStoryblok | CardListStoryblok)
  content: ListWidgetStoryblok
  items: PageItem[]
}> = ({ listOption, content, items }) => {
  if (listOption.component === 'lists') {
    return <SbEditable content={content}><ListWidgetLists items={items}
                                                          options={listOption} /></SbEditable>
  }
  return <SbEditable content={content}><ListWidgetCards content={content}
                                                        items={items}
                                                        options={listOption} /></SbEditable>
}

export default ListWidgetContainer
