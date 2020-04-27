import { ListWidgetStoryblok, PageStoryblok } from '../../typings/generated/components-schema'
import { StoryData } from 'storyblok-js-client'
import { CategoryComponent, PageComponent } from '../../typings/generated/schema'
import { listWidgetFilter } from '../../components/list-widget/ListWidget'


const traversePageContent = (page: PageStoryblok) => {
  const listWidgets: ListWidgetStoryblok[] = []
  const walkArray = (elements: any[]) => {
    elements.forEach(item => {
      if (item.component === 'list_widget') {
        listWidgets.push(item)
      } else if (Array.isArray(item.body)) {
        walkArray(item.body)
      }
    })
  }

  if (Array.isArray(page.body)) {
    walkArray(page.body)
  }
  if (Array.isArray(page.right_body)) {
    walkArray(page.right_body)
  }
  return listWidgets
}

// const prepareListStory = (listParams: ListWidgetStoryblok, allCategories: StoryData<CategoryComponent>[], locale?: string) => {
//   console.log(listParams)
//   const categories = Array.isArray(listParams.categories) && allCategories.filter(i => listParams.categories.includes(i.uuid))
//   console.log(categories)
//   const params: StoriesParams = {
//     per_page: listParams.maximum_items || 25,
//     excluding_fields: 'body,right_body,meta_robots,property,meta_description,seo_body',
//     sort_by: 'published_at:desc',
//     filter_query: {
//       'component': {
//         'in': 'page'
//       }
//     }
//   }
//   if (CONFIG.rootDirectory) {
//     params.starts_with = `${CONFIG.rootDirectory}/`
//   } else if (locale) {
//     params.starts_with = `${locale}/`
//   }
//
// }


export const collectComponentData = async (
  page: PageStoryblok,
  _allCategories: StoryData<CategoryComponent>[],
  allStories: StoryData<PageComponent>[],
  _locale?: string
) => {
  const listWidgets = traversePageContent(page)
  const listData: { [k: string]: StoryData<PageComponent>[] } = {}
  listWidgets.forEach(item => {
    listData[item._uid] = listWidgetFilter(item, allStories)
  })
  if (listWidgets.length !== Object.keys(listData).length) {
    // make sure list widgets are all fetched and merged correctly (_uid might not be unique)
    console.error('list widget has identical _uid')
  }

  return listData
}
