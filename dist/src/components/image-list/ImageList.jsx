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
import clsx from 'clsx';
import SbEditable from 'storyblok-react';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import ImageListItem from './ImageListItem';
import ImageListLightbox from './ImageListLightbox';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var ImageList = function (props) {
    var _a;
    var dimensions = useWindowDimensions();
    var containerRef = React.createRef();
    var _b = __read(useInView({
        triggerOnce: true,
        rootMargin: '300px 0px 300px 0px'
    }), 2), refIntersectionObserver = _b[0], inView = _b[1];
    var _c = __read(useState({ width: 0, height: 0 }), 2), childDimensions = _c[0], setChildDimensions = _c[1];
    var _d = __read(useState(''), 2), lightbox = _d[0], setLightbox = _d[1];
    useEffect(function () {
        var element = containerRef.current;
        if (!element)
            return;
        var firstChild = element.firstChild;
        if (!firstChild)
            return;
        // @ts-ignore
        if (!firstChild.firstElementChild)
            return;
        // @ts-ignore
        var imageContainer = firstChild.firstElementChild.firstElementChild.tagName === 'IMG' ?
            // @ts-ignore
            firstChild.firstElementChild : firstChild.firstElementChild.firstElementChild;
        setChildDimensions({
            width: imageContainer.clientWidth,
            height: imageContainer.clientHeight
        });
    }, [dimensions.width]);
    var content = props.content;
    var gutterSize = content.column_gap || 2;
    var columnCount = content.column_count || 5;
    var columnCountTablet = content.column_count_tablet || 4;
    var columnCountPhone = content.column_count_phone || 1;
    var imageContainerClasses = clsx('mdc-image-list', (_a = {
            'mdc-image-list--masonry': !!content.masonry,
            'mdc-image-list--with-text-protection': !!content.text_protection
        },
        _a["lm-image-list" + (content.masonry ? '-masonry' : '') + "__column-" + columnCount + "-desktop-" + gutterSize] = true,
        _a["lm-image-list" + (content.masonry ? '-masonry' : '') + "__column-" + columnCountTablet + "-tablet-" + gutterSize] = true,
        _a["lm-image-list" + (content.masonry ? '-masonry' : '') + "__column-" + columnCountPhone + "-phone-" + gutterSize] = true,
        _a));
    var listItemStyles = {};
    content.enable_lightbox && (listItemStyles.cursor = 'pointer');
    function onImageClick(element) {
        // open lightbox
        content.enable_lightbox && setLightbox(element._uid);
    }
    var imageListItemProps = {
        style: listItemStyles,
        inView: inView,
        width: childDimensions.width,
        height: childDimensions.height,
        aspect_ratio: content.aspect_ratio,
        masonry: content.masonry,
        image_crop: content.image_crop,
        fit_in_color: content.fit_in_color
    };
    var body = content.body || [];
    return (<SbEditable content={content}>
      <div ref={containerRef}>
        <ul className={imageContainerClasses} ref={refIntersectionObserver}>
          {body.map(function (item, i) { return (<ImageListItem {...item} {...imageListItemProps} key={item._uid} onImageClick={function (ev) { return onImageClick(__assign({ _uid: item._uid, count: i }, ev)); }}/>); })}
        </ul>
      </div>
      {lightbox && ImageListLightbox({
        elements: body,
        lightbox: lightbox,
        setLightbox: setLightbox,
        dimensions: dimensions,
        onImageClick: onImageClick
    })}
    </SbEditable>);
};
export default ImageList;
