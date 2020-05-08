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
import React from 'react';
import NavList from '../nav-list/NavList';
var ListWidgetLinks = function (_a) {
    var items = _a.items, options = _a.options, content = _a.content;
    var listProps = __assign(__assign({}, options), { _uid: content._uid, body: items.map(function (item) {
            var opts = {
                _uid: content._uid + item.uuid,
                component: 'nav_item',
                name: (item.content && (item.content.preview_title || item.name)) || '',
                link: {
                    cached_url: item.full_slug,
                    linktype: 'story'
                }
            };
            return opts;
        }) });
    return (React.createElement(NavList, { content: listProps }));
};
export default ListWidgetLinks;
