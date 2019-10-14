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
import { Card } from '@rmwc/card';
import CardLink from './CardLink';
import Components from 'components';
import { Drawer, DrawerContent } from '@rmwc/drawer';
import React from 'react';
var CardWrap = function (_a) {
    var children = _a.children, content = _a.content, className = _a.className, style = _a.style, outlined = _a.outlined;
    var body = content.body || [];
    var _b = __read(React.useState(false), 2), open = _b[0], setOpen = _b[1];
    function onDrawerClose() {
        setOpen(false);
        document.body.style.overflow = 'auto'; // prevent scroll while its open
    }
    function onDrawerOpen() {
        document.body.style.overflow = 'hidden'; // prevent scroll while its open
    }
    if (body.length) {
        return (<SbEditable content={content}>
        <Card className={className} style={style} outlined={outlined}>
          <a onClick={function () { return setOpen(!open); }}>
            {children}
          </a>
        </Card>
        <Drawer modal open={open} dir="rtl" className="lm-card__drawer" onOpen={function () { return onDrawerOpen(); }} onClose={function () { return onDrawerClose(); }}>
          <DrawerContent dir="ltr">
            {body.map(function (blok) { return Components(blok); })}
          </DrawerContent>
        </Drawer>
      </SbEditable>);
    }
    return (<SbEditable content={content}>
      <Card className={className} style={style} outlined={outlined}>
        <CardLink {...content}>
          {children}
        </CardLink>
      </Card>
    </SbEditable>);
};
export default CardWrap;
