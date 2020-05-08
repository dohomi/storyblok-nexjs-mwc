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
const ContentLink = ({ children, className, content, passHref, isMuiLink }) => {
    if (content.link) {
        const _a = getLinkAttrs(content.link, { openExternal: !!content.open_external }), { rel, target, external } = _a, attrs = __rest(_a, ["rel", "target", "external"]);
        if (attrs.href) {
            if (external) {
                return (React.createElement(SbEditable, { content: content }, isMuiLink ? (React.createElement(MuiNextLink, { href: attrs.href, rel: rel, target: target, className: className }, children)) : (React.createElement("a", { href: attrs.href, rel: rel, target: target, className: className }, children))));
            }
            const props = {};
            if (!CONFIG.prefetch) {
                props.prefetch = false;
            }
            if (isMuiLink) {
                return (React.createElement(SbEditable, { content: content },
                    React.createElement(MuiNextLink, Object.assign({ href: content.link.nextHref || '/[...index]', as: attrs.href }, props), children)));
            }
            return (React.createElement(SbEditable, { content: content },
                !passHref && (React.createElement(Link, Object.assign({}, attrs, { href: content.link.nextHref || '/[...index]', as: attrs.href }, props),
                    React.createElement("a", { rel: rel, target: target, className: className }, children))),
                passHref && (React.createElement(Link, Object.assign({}, attrs, { href: content.link.nextHref || '/[...index]', as: attrs.href, passHref: true }, props), children))));
        }
    }
    return (React.createElement(SbEditable, { content: content }, children));
};
export default ContentLink;
