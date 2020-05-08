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
const InlineClassMapping = {
    bold: 'font-weight-bold',
    strike: 'text-decoration-line-through',
    underline: 'text-decoration-underline',
    strong: 'font-weight-bolder',
    code: 'text-code',
    italic: 'font-italic',
    link: 'text-link',
    styled: ''
};
const RteNodeText = ({ content }) => {
    if (content.marks && content.marks.length) {
        const link = content.marks.find(({ type }) => type === 'link');
        const className = clsx(content.marks.map(({ type, attrs }) => {
            if (attrs && attrs.class) {
                return attrs.class;
            }
            return InlineClassMapping[type];
        }));
        if (link) {
            const _a = getLinkAttrs({
                cached_url: link.attrs.href,
                linktype: link.attrs.linktype
            }, {}), { rel, target, external } = _a, rest = __rest(_a, ["rel", "target", "external"]);
            if (external) {
                return (React.createElement(MuiLink, { href: rest.href, rel: rel, target: target }, content.text));
            }
            const props = {};
            if (!CONFIG.prefetch) {
                props.prefetch = false;
            }
            return (React.createElement(MuiNextLink, Object.assign({ href: "/[...index]", as: rest.href, rel: rel, target: target }, props), content.text));
        }
        return React.createElement("span", { className: className }, content.text);
    }
    return React.createElement(React.Fragment, null, content.text);
};
export default RteNodeText;
