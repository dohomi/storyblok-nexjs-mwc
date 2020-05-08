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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import clsx from 'clsx';
import MuiLink from '@material-ui/core/Link';
import { getLinkAttrs } from '../../../utils/linkHandler';
import MuiNextLink from '../../link/MuiNextLink';
import { CONFIG } from '../../../utils/config';
var InlineClassMapping = {
    bold: 'font-weight-bold',
    strike: 'text-decoration-line-through',
    underline: 'text-decoration-underline',
    strong: 'font-weight-bolder',
    code: 'text-code',
    italic: 'font-italic',
    link: 'text-link',
    styled: ''
};
var RteNodeText = function (_a) {
    var content = _a.content;
    if (content.marks && content.marks.length) {
        var link = content.marks.find(function (_a) {
            var type = _a.type;
            return type === 'link';
        });
        var className = clsx(content.marks.map(function (_a) {
            var type = _a.type, attrs = _a.attrs;
            if (attrs && attrs.class) {
                return attrs.class;
            }
            return InlineClassMapping[type];
        }));
        if (link) {
            var _b = getLinkAttrs({
                cached_url: link.attrs.href,
                linktype: link.attrs.linktype
            }, {}), rel = _b.rel, target = _b.target, external_1 = _b.external, rest = __rest(_b, ["rel", "target", "external"]);
            if (external_1) {
                return (React.createElement(MuiLink, { href: rest.href, rel: rel, target: target }, content.text));
            }
            var props = {};
            if (!CONFIG.prefetch) {
                props.prefetch = false;
            }
            return (React.createElement(MuiNextLink, __assign({ href: "/[...index]", as: rest.href, rel: rel, target: target }, props), content.text));
        }
        return React.createElement("span", { className: className }, content.text);
    }
    return React.createElement(React.Fragment, null, content.text);
};
export default RteNodeText;
