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
import React from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import { getImageAttrs } from '../../utils/ImageService';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var Image = function (_a) {
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var fallback = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    var imageCrop = content.image_crop || [];
    var property = content.property || [];
    var fitInColor = (content.color && content.color.rgba) || content.fit_in_color;
    var containerClassName = clsx('img-figure', content.class_names && content.class_names.values);
    var _b = __read(useInView({
        triggerOnce: true,
        rootMargin: '300px 0px 300px 0px'
    }), 3), refIntersectionObserver = _b[0], inView = _b[1], intersectionElement = _b[2];
    var className = clsx('img-fluid', 'progressive-img-container', content.property);
    var imgProps = {
        src: fallback,
        srcSet: fallback,
        style: {},
        alt: content.alt || 'website image',
        className: className
    };
    if (inView && content.source) {
        var parentElement = intersectionElement && intersectionElement.target.parentElement;
        var parentElementDimensions = (parentElement && parentElement.getBoundingClientRect()) || { width: 0 };
        var square = property.includes('rounded-circle') || property.includes('square');
        var definedWidth = content.width;
        var definedHeight = content.height_xs && dimensions.width <= 600 ? content.height_xs : content.height;
        var width = Math.ceil(parentElementDimensions.width);
        if ((!definedWidth && !definedHeight) || imageCrop.length || fitInColor) {
            // default: set available width to the current width either in crop mode
            definedWidth = definedWidth || width;
        }
        if (square) {
            // overwrite if square
            var iconSize = definedHeight || definedWidth || 64;
            definedWidth = iconSize;
            definedHeight = iconSize;
        }
        if (content.height_fill) {
            var grandParentDim = (parentElement && parentElement.parentElement && parentElement.parentElement.getBoundingClientRect()) || {
                width: 0,
                height: 0
            };
            // with a tolerance of 200 height should fit grandparents height
            if (grandParentDim.width > parentElementDimensions.width + 200) {
                definedHeight = Math.ceil(grandParentDim.height);
            }
        }
        var imgAttrs = getImageAttrs({
            originalSource: content.source,
            width: Number(definedWidth),
            height: definedHeight,
            fitInColor: fitInColor,
            focalPoint: content.focal_point,
            smart: imageCrop.includes('smart_crop')
        });
        imgProps = __assign(__assign(__assign({}, imgProps), imgAttrs), { style: {
                width: content.width ? content.width + "px" : 'auto',
                maxHeight: 'inherit',
                height: definedHeight ? definedHeight + "px" : 'auto'
            } });
    }
    function onImageLoaded() {
        intersectionElement && intersectionElement.target && intersectionElement.target.firstElementChild && intersectionElement.target.firstElementChild.classList.add('loaded');
    }
    return (<SbEditable content={content}>
      <figure ref={refIntersectionObserver} className={containerClassName}>
        <img {...imgProps} onLoad={onImageLoaded}/>
      </figure>
    </SbEditable>);
};
export default Image;
