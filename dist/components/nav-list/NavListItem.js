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
import ContentLink from '../link/ContentLink';
var NavListItem = function (props) {
    var content = __assign({}, props);
    return (React.createElement(ContentLink, { isMuiLink: true, className: 'lm-nav-link__item', content: content }, content.name));
};
export default NavListItem;
