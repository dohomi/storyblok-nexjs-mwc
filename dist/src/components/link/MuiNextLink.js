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
const NextComposed = React.forwardRef((props, ref) => {
    const { as, href, replace, scroll, passHref, shallow, prefetch } = props, other = __rest(props, ["as", "href", "replace", "scroll", "passHref", "shallow", "prefetch"]);
    return (React.createElement(NextLink, { href: href, prefetch: prefetch, as: as, replace: replace, scroll: scroll, shallow: shallow, passHref: passHref },
        React.createElement("a", Object.assign({ ref: ref }, other))));
});
// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
    const { href, activeClassName = 'active', className: classNameProps, innerRef, naked } = props, other = __rest(props, ["href", "activeClassName", "className", "innerRef", "naked"]);
    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: (router === null || router === void 0 ? void 0 : router.pathname) === pathname && activeClassName // todo probably router.asPath??
    });
    if (naked) {
        return React.createElement(NextComposed, Object.assign({ className: className, ref: innerRef, href: href }, other));
    }
    return (React.createElement(MuiLink, Object.assign({ component: NextComposed, className: className, ref: innerRef, href: href }, other)));
}
export default React.forwardRef((props, ref) => (React.createElement(Link, Object.assign({}, props, { innerRef: ref }))));
