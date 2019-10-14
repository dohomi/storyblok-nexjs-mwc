var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import SbEditable from 'storyblok-react';
import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import Components from 'components';
import { Button } from '@rmwc/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
var CustomMenu = function (_a) {
    var _b;
    var content = _a.content;
    var asPath = useRouter().asPath;
    var _c = __read(useState(false), 2), open = _c[0], setOpen = _c[1];
    var menuItems = content.body || [];
    var buttonProps = (_b = {},
        _b['onClick'] = function () { return openMegaMenu(); },
        _b);
    useEffect(function () {
        setOpen(false);
    }, [asPath]);
    function openMegaMenu() {
        setOpen(true);
    }
    function onClose() {
        setOpen(false);
    }
    return (<SbEditable content={content}>
      <MenuSurfaceAnchor className="lm-mega-menu">
        <Button trailingIcon="expand_more" {...buttonProps}>{content.title}</Button>
        <MenuSurface open={open} anchorCorner="bottomStart" style={{ borderRadius: (content.border_radius || 4) + "px" }} onClose={function () { return onClose(); }}>
          {menuItems.map(function (blok) { return Components(blok); })}
        </MenuSurface>
      </MenuSurfaceAnchor>
    </SbEditable>);
};
export default CustomMenu;
