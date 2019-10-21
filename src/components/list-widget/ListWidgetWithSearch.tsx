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
import { useRouter } from 'next/router'

const ListWidgetWithSearch: FunctionComponent<{
  listOption: (ListsStoryblok | CardListStoryblok)
  content: ListWidgetStoryblok
  items: PageItem[]
}> = ({ listOption, content, items }) => {
  const { query } = useRouter()
  const [searchParams] = useGlobalState('searchParams')
  let searchParamsCategories = searchParams.categories || []
  if (!searchParams.categories && query.search__categories) {
    searchParamsCategories = Array.isArray(query.search__categories) ? query.search__categories : [query.search__categories]
  }
  let searchText = searchParams.searchText
  if (!searchParams.searchText && query.search__text) {
    searchText = query.search__text as string
  }
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
