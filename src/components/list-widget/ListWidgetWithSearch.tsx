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
  // const [initialized, setInitialized] = useState<boolean>(false)

  const [searchParams] = useGlobalState('searchParams')
  // console.log('list-widget', searchParams, query)
  let searchParamsCategories = searchParams.categories || []
  console.log('list widget', searchParamsCategories, query.search__categories)
  if (!searchParams.categories && query.search__categories) {
    searchParamsCategories = Array.isArray(query.search__categories) ? query.search__categories : [query.search__categories]
    console.log('inside init', query.search__categories)
    // setInitialized(true)
  }
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
