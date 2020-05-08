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
import { default as React } from 'react';
import { getLinkAttrs } from '../../utils/linkHandler';
import SbEditable from 'storyblok-react';
import Link from 'next/link';
import MuiNextLink from './MuiNextLink';
import { CONFIG } from '../../utils/config';
var ContentLink = function (_a) {
    var children = _a.children, className = _a.className, content = _a.content, passHref = _a.passHref, isMuiLink = _a.isMuiLink;
    if (content.link) {
        var _b = getLinkAttrs(content.link, { openExternal: !!content.open_external }), rel = _b.rel, target = _b.target, external_1 = _b.external, attrs = __rest(_b, ["rel", "target", "external"]);
        if (attrs.href) {
            if (external_1) {
                return (React.createElement(SbEditable, { content: content }, isMuiLink ? (React.createElement(MuiNextLink, { href: attrs.href, rel: rel, target: target, className: className }, children)) : (React.createElement("a", { href: attrs.href, rel: rel, target: target, className: className }, children))));
            }
            var props = {};
            if (!CONFIG.prefetch) {
                props.prefetch = false;
            }
            if (isMuiLink) {
                return (React.createElement(SbEditable, { content: content },
                    React.createElement(MuiNextLink, __assign({ href: content.link.nextHref || '/[...index]', as: attrs.href }, props), children)));
            }
            return (React.createElement(SbEditable, { content: content },
                !passHref && (React.createElement(Link, __assign({}, attrs, { href: content.link.nextHref || '/[...index]', as: attrs.href }, props),
                    React.createElement("a", { rel: rel, target: target, className: className }, children))),
                passHref && (React.createElement(Link, __assign({}, attrs, { href: content.link.nextHref || '/[...index]', as: attrs.href, passHref: true }, props), children))));
        }
    }
    return (React.createElement(SbEditable, { content: content }, children));
};
export default ContentLink;
