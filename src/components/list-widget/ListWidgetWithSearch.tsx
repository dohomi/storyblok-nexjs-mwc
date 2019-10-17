import { default as React, FunctionComponent } from 'react'
import { CardListStoryblok, ListsStoryblok, ListWidgetStoryblok } from '../../typings/generated/components-schema'
import { PageItem } from '../../typings/generated/schema'
import ListWidgetContainer from './ListWidgetContainer'
import { useGlobalState } from '../../utils/state/state'

const ListWidgetWithSearch: FunctionComponent<{
  listOption: (ListsStoryblok | CardListStoryblok)
  content: ListWidgetStoryblok
  items: PageItem[]
}> = ({ listOption, content, items }) => {
  const [searchParams] = useGlobalState('searchParams')
  const searchParamsCategories = searchParams.categories
  if (searchParamsCategories.length) {
    items = items.filter((item: PageItem) => {
      const itemCategories = item.tag_list || []
      return searchParamsCategories.some((element) => itemCategories.includes(element))
    })
  }
  return <ListWidgetContainer listOption={listOption} content={content} items={items} />
}

export default ListWidgetWithSearch
