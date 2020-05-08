var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import CardList from '../card/CardList';
import React from 'react';
var ListWidgetCards = function (_a) {
    var items = _a.items, content = _a.content, options = _a.options;
    return React.createElement(CardList, { content: __assign(__assign({}, options), { _uid: content._uid, component: 'card_list', body: items.map(function (item) {
                var itemContent = item.content;
                if (content.sort === 'publish' && !itemContent.preview_publish_date) {
                    console.info('missing preview publish date:', item.full_slug);
                }
                return {
                    _uid: item.uuid,
                    component: 'card_list_item',
                    title: itemContent.preview_title || itemContent.meta_title || item.name,
                    subtitle: itemContent.preview_subtitle,
                    description: itemContent.preview_teaser,
                    image: itemContent.preview_image,
                    link: {
                        cached_url: item.full_slug,
                        linktype: 'story'
                    }
                };
            }) }) });
};
export default ListWidgetCards;
