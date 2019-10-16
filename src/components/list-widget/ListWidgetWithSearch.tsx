import { default as React, FunctionComponent } from 'react'
import {
  CardListStoryblok,
  ListsStoryblok,
  ListWidgetStoryblok,
  PageStoryblok
} from '../../typings/generated/components-schema'
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
  console.log(searchParamsCategories)
  if (searchParamsCategories.length) {
    items = items.filter((item: PageItem) => {
      const itemContent = item.content as PageStoryblok
      const itemCategories = itemContent.categories || []
      console.log(itemCategories,searchParamsCategories)
      return searchParamsCategories.some((element) => itemCategories.includes(element))
    })
  }
  return <ListWidgetContainer listOption={listOption} content={content} items={items} />
}

export default ListWidgetWithSearch
