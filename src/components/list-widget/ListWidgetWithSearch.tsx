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
  console.log('list-widget', searchParams)

  const searchParamsCategories = searchParams.categories
  const searchText = searchParams.searchText
  if (searchParamsCategories.length || searchText) {
    items = items.filter((item: PageItem) => {
      const itemCategories = item.tag_list || []
      const inCategory = searchParamsCategories.length
        ? searchParamsCategories.some((element) => itemCategories.includes(element))
        : false
      if (inCategory) {
        return true
      }
      const pageContent = item.content as PageStoryblok
      const inSearchText = searchText
        // @ts-ignore
        ? item.full_slug.includes(searchText) || pageContent.preview_title.includes(searchText)
        : undefined
      if (inSearchText === undefined) {
        return false
      }
      return inSearchText
    })
  }
  return <ListWidgetContainer listOption={listOption} content={content} items={items} />
}

export default ListWidgetWithSearch
