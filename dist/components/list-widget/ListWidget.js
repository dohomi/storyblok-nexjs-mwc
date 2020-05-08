import React from 'react';
import ListWidgetWithSearch from './ListWidgetWithSearch';
import ListWidgetContainer from './ListWidgetContainer';
import { useAppContext } from '../provider/AppProvider';
export var listWidgetFilter = function (content, allStories) {
    var filter = (content.tags && content.tags.values) || [];
    var sort = content.sort;
    var sortDescending = content.sort_descending;
    var stories = (allStories || [])
        .filter(function (item) {
        var itemCategories = item.tag_list || [];
        if (filter.length) {
            return content.match_all_tags
                ? filter.every(function (element) { return itemCategories.includes(element); })
                : filter.some(function (element) { return itemCategories.includes(element); });
        }
        if (content.only_tagged) {
            return !!itemCategories.length;
        }
        return true;
    })
        .sort(function (a, b) {
        var sortACriteria = a.published_at;
        var sortBCriteria = b.published_at;
        var itemContentA = a.content;
        var itemContentB = b.content;
        if (sort === 'created') {
            sortACriteria = a.created_at;
            sortBCriteria = b.created_at;
        }
        else if (sort === 'updated') {
            sortBCriteria = b.published_at;
            sortACriteria = a.published_at;
        }
        else if (sort === 'publish') {
            sortACriteria = itemContentA.preview_publish_date || a.published_at;
            sortBCriteria = itemContentB.preview_publish_date || b.published_at;
        }
        else if (sort === 'title') {
            sortACriteria = String(itemContentA.preview_title || a.name).toLowerCase();
            sortBCriteria = String(itemContentB.preview_title || b.name).toLowerCase();
        }
        if (String(sortACriteria) < String(sortBCriteria)) {
            return sortDescending ? +1 : -1;
        }
        if (String(sortACriteria) > String(sortBCriteria)) {
            return sortDescending ? -1 : 1;
        }
        return 0;
    });
    if (content.maximum_items) {
        return stories.slice(0, content.maximum_items);
    }
    return stories;
};
var ListWidget = function (_a) {
    var content = _a.content;
    var listWidgetData = useAppContext().listWidgetData;
    var items = (listWidgetData && listWidgetData[content._uid]) || [];
    var listOption = (content.list_options && content.list_options[0]) || {};
    if (content.enable_for_search) {
        return React.createElement(ListWidgetWithSearch, { listOption: listOption, content: content, items: items });
    }
    return React.createElement(ListWidgetContainer, { listOption: listOption, content: content, items: items });
};
export default ListWidget;
