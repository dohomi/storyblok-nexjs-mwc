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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import clsx from 'clsx';
import SbEditable from 'storyblok-react';
import PricingItem from './PricingItem';
import { createRef, useEffect } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var equalizeHeights = function (querySelectorAll) {
    if (!querySelectorAll)
        return;
    if (querySelectorAll.length) {
        var heights_1 = [];
        querySelectorAll.forEach(function (container) {
            heights_1.push(container.clientHeight);
        });
        var max_1 = Math.max.apply(Math, __spread(heights_1));
        querySelectorAll.forEach(function (container) {
            container.style.minHeight = max_1 + "px";
        });
    }
};
var Pricing = function (_a) {
    var _b;
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var containerRef = createRef();
    var gutterSize = content.column_gap || 2;
    var body = content.body || [];
    var columnCount = content.column_count || body.length;
    var columnCountTablet = content.column_count_tablet || columnCount;
    var columnCountPhone = content.column_count_phone || 1;
    var containerClasses = clsx('mdc-image-list lm-pricing', (_b = {},
        _b["lm-image-list__column-" + columnCount + "-desktop-" + gutterSize] = true,
        _b["lm-image-list__column-" + columnCountTablet + "-tablet-" + gutterSize] = true,
        _b["lm-image-list__column-" + columnCountPhone + "-phone-" + gutterSize] = true,
        _b));
    useEffect(function () {
        var current = containerRef.current;
        equalizeHeights(current && current.querySelectorAll('.lm-pricing__title'));
    }, [dimensions]);
    return (<SbEditable content={content}>
      <ul className={containerClasses} ref={containerRef}>
        {body.map(function (item) {
        return (<li key={item._uid} className="mdc-image-list__item">
              {PricingItem(item)}
            </li>);
    })}
      </ul>
    </SbEditable>);
};
export default Pricing;
