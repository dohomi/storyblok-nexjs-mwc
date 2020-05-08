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
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
var NextComposed = React.forwardRef(function (props, ref) {
    var as = props.as, href = props.href, replace = props.replace, scroll = props.scroll, passHref = props.passHref, shallow = props.shallow, prefetch = props.prefetch, other = __rest(props, ["as", "href", "replace", "scroll", "passHref", "shallow", "prefetch"]);
    return (React.createElement(NextLink, { href: href, prefetch: prefetch, as: as, replace: replace, scroll: scroll, shallow: shallow, passHref: passHref },
        React.createElement("a", __assign({ ref: ref }, other))));
});
// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
    var _a;
    var href = props.href, _b = props.activeClassName, activeClassName = _b === void 0 ? 'active' : _b, classNameProps = props.className, innerRef = props.innerRef, naked = props.naked, other = __rest(props, ["href", "activeClassName", "className", "innerRef", "naked"]);
    var router = useRouter();
    var pathname = typeof href === 'string' ? href : href.pathname;
    var className = clsx(classNameProps, (_a = {},
        _a[activeClassName] = (router === null || router === void 0 ? void 0 : router.pathname) === pathname && activeClassName // todo probably router.asPath??
    ,
        _a));
    if (naked) {
        return React.createElement(NextComposed, __assign({ className: className, ref: innerRef, href: href }, other));
    }
    return (React.createElement(MuiLink, __assign({ component: NextComposed, className: className, ref: innerRef, href: href }, other)));
}
export default React.forwardRef(function (props, ref) { return (React.createElement(Link, __assign({}, props, { innerRef: ref }))); });
