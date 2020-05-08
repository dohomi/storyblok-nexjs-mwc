var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { listWidgetFilter } from '../../components/list-widget/ListWidget';
export const traversePageContent = (page, lookup = 'list_widget') => {
    const listWidgets = [];
    const walkArray = (elements) => {
        elements.forEach(item => {
            if (item.component === lookup) {
                listWidgets.push(item);
            }
            else if (Array.isArray(item.body)) {
                walkArray(item.body);
            }
        });
    };
    if (Array.isArray(page.body)) {
        walkArray(page.body);
    }
    if (Array.isArray(page.right_body)) {
        walkArray(page.right_body);
    }
    return listWidgets;
};
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
export const collectComponentData = (page, _allCategories, allStories = [], _locale) => __awaiter(void 0, void 0, void 0, function* () {
    const listWidgets = traversePageContent(page);
    const listData = {};
    listWidgets.forEach(item => {
        listData[item._uid] = listWidgetFilter(item, allStories);
    });
    if (listWidgets.length !== Object.keys(listData).length) {
        // make sure list widgets are all fetched and merged correctly (_uid might not be unique)
        console.error('list widget has identical _uid');
    }
    return listData;
});
