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
import CardListItem from './CardListItem';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var CardList = function (_a) {
    var _b;
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var _c = __read(useInView({
        triggerOnce: true,
        rootMargin: '400px 0px 400px 0px'
    }), 3), refIntersectionObserver = _c[0], inView = _c[1], intersectionElement = _c[2];
    var _d = __read(useState({ width: 0, height: 0 }), 2), mediaDimension = _d[0], setMediaDimension = _d[1];
    var cardRef = React.createRef();
    var body = content.body || [];
    var imageRatio = content.image_ratio || '16x9';
    var gutterSize = content.column_gap || 2;
    var columnCount = content.column_count || 5;
    var columnCountTablet = content.column_count_tablet || 4;
    var columnCountPhone = content.column_count_phone || 1;
    useEffect(function () {
        if (inView) {
            if (!intersectionElement) {
                return;
            }
            var current = cardRef.current;
            var mediaContainer = current && current.querySelector('.mdc-card__media');
            if (mediaContainer) {
                setMediaDimension({
                    width: mediaContainer.clientWidth,
                    height: mediaContainer.clientHeight
                });
            }
        }
    }, [inView, dimensions]);
    var containerClasses = clsx('mdc-image-list', (_b = {},
        _b["lm-image-list__column-" + columnCount + "-desktop-" + gutterSize] = true,
        _b["lm-image-list__column-" + columnCountTablet + "-tablet-" + gutterSize] = true,
        _b["lm-image-list__column-" + columnCountPhone + "-phone-" + gutterSize] = true,
        _b));
    return (<SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <ul className={containerClasses} ref={cardRef}>
          {body.map(function (item) { return (<li key={item._uid} className="mdc-image-list__item">
              {CardListItem(__assign(__assign({}, item), { inView: inView,
        mediaDimension: mediaDimension, image_size: content.image_size, elevation: content.elevation, border_radius: content.border_radius, variant: content.variant, title_tag: content.title_tag, titleClassName: content.title_class_name && content.title_class_name.values, subtitleClassName: content.subtitle_class_name && content.subtitle_class_name.values, descriptionClassName: content.description_class_name && content.description_class_name.values, subtitle_tag: content.subtitle_tag, title_typography: content.title_typography, subtitle_typography: content.subtitle_typography, description_typography: content.description_typography, sixteenByNine: imageRatio === '16x9', square: imageRatio === '1x1' // todo
     }))}
            </li>); })}
        </ul>
      </div>
    </SbEditable>);
};
export default CardList;
