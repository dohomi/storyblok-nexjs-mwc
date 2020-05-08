var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { listWidgetFilter } from '../../components/list-widget/ListWidget';
export var traversePageContent = function (page, lookup) {
    if (lookup === void 0) { lookup = 'list_widget'; }
    var listWidgets = [];
    var walkArray = function (elements) {
        elements.forEach(function (item) {
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
export var collectComponentData = function (page, _allCategories, allStories, _locale) {
    if (allStories === void 0) { allStories = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var listWidgets, listData;
        return __generator(this, function (_a) {
            listWidgets = traversePageContent(page);
            listData = {};
            listWidgets.forEach(function (item) {
                listData[item._uid] = listWidgetFilter(item, allStories);
            });
            if (listWidgets.length !== Object.keys(listData).length) {
                // make sure list widgets are all fetched and merged correctly (_uid might not be unique)
                console.error('list widget has identical _uid');
            }
            return [2 /*return*/, listData];
        });
    });
};
