import React from 'react';
import ListWidgetContainer from './ListWidgetContainer';
import { useGlobalState } from '../../utils/state/state';
import { useRouter } from 'next/router';
var ListWidgetWithSearch = function (_a) {
    var listOption = _a.listOption, content = _a.content, items = _a.items;
    var router = useRouter();
    var query = router === null || router === void 0 ? void 0 : router.query;
    var searchParams = useGlobalState('searchParams')[0];
    var searchParamsCategories = searchParams.categories || [];
    if (!searchParams.categories && query.search__categories) {
        searchParamsCategories = Array.isArray(query.search__categories) ? query.search__categories : [query.search__categories];
    }
    var searchText = searchParams.searchText;
    if (!searchParams.searchText && query.search__text) {
        searchText = query.search__text;
    }
    if (searchParamsCategories.length || searchText) {
        items = items.filter(function (item) {
            var itemCategories = item.tag_list || [];
            var inCategory = searchParamsCategories.length
                ? searchParamsCategories.some(function (element) { return itemCategories.includes(element); })
                : false;
            if (inCategory) {
                return true;
            }
            var pageContent = item.content;
            var inSearchText = searchText
                // @ts-ignore
                ? [item.full_slug, pageContent.preview_title].some(function (term) { return term && term.search(new RegExp(searchText, 'i')) !== -1; })
                : undefined;
            if (inSearchText === undefined) {
                return false;
            }
            return inSearchText;
        });
    }
    return React.createElement(ListWidgetContainer, { listOption: listOption, content: content, items: items });
};
export default ListWidgetWithSearch;
