import ListWidgetLists from './ListWidgetLists';
import ListWidgetCards from './ListWidgetCards';
import * as React from 'react';
import ListWidgetLinks from './ListWidgetLinks';
const ListWidgetContainer = ({ listOption, content, items }) => {
    if (listOption.component === 'lists') {
        return React.createElement(ListWidgetLists, { content: content, items: items, options: listOption });
    }
    else if (listOption.component === 'nav_list') {
        return React.createElement(ListWidgetLinks, { items: items, options: listOption, content: content });
    }
    return React.createElement(ListWidgetCards, { content: content, items: items, options: listOption });
};
export default ListWidgetContainer;
