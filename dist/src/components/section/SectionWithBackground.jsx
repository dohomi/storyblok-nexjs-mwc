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
import { getImageAttrs, getPreviewImageSource } from '../../utils/ImageService';
import { useInView } from 'react-intersection-observer';
import { createRef, useEffect, useState } from 'react';
import { getImage } from '../../utils/fetchImageHelper';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import useResizeAware from '../react-resize-aware/src/useResizeAware';
var WithBackgroundImage = function (props) {
    var isColumn = props.isColumn; // used in Column.js
    var containerProps = props.containerProps || {};
    var backgroundImage = containerProps.image; // original img source
    var backgroundStyle = props.background_style; // background attachment props
    var imageProperties = containerProps.imageProperties;
    var lazyDisabled = imageProperties.includes('disable_lazy_load');
    var containerRef;
    var wrap = createRef();
    var _a = __read(useResizeAware(), 2), resizeListener = _a[0], sizes = _a[1];
    // const sizes = useComponentSize(wrap)
    var dimensions = useWindowDimensions();
    var containerClasses = clsx(!isColumn && 'mw-100 mh-100', 'lm-relative-wrap', props.className, {
    // 'lm-background-image': true,
    // 'progressive-img-container': true
    });
    var backgroundClasses = 'progressive-img-container lm-background-image';
    var _b = __read(useInView({
        triggerOnce: true,
        rootMargin: '300px 0px 300px 0px'
    }), 3), refIntersectionObserver = _b[0], inView = _b[1], intersectionElement = _b[2];
    var initialSrc = getPreviewImageSource(backgroundImage);
    var initialState = {
        backgroundImage: "url(\"" + initialSrc + "\")"
    };
    var _c = __read(useState({}), 2), styles = _c[0], setStyles = _c[1];
    useEffect(function () {
        var processImg = function (container) {
            var overwriteHeight;
            // @ts-ignore
            var isDevice = window['userDevice'] && window['userDevice'].device;
            if (!isDevice) {
                if (['fixed_cover', 'fixed_image'].includes(backgroundStyle)) {
                    overwriteHeight = dimensions.height; // overwrite height to match viewport height
                }
            }
            var current = wrap.current;
            var img = getImageAttrs({
                originalSource: backgroundImage,
                width: current.clientWidth,
                height: overwriteHeight || current.clientHeight,
                focalPoint: containerProps.focalPoint,
                smart: true
            });
            // fetch current image and set correct src after loaded
            getImage({
                src: img.src,
                srcSet: img.srcSet,
                onReady: function (src) {
                    var newStyles = __assign(__assign({}, styles), { 
                        // filter: 'blur(0)', // unset blur effect
                        backgroundImage: "url(\"" + src + "\")" });
                    if (['fixed_cover', 'fixed_image'].includes(backgroundStyle) && !isDevice) {
                        newStyles.backgroundAttachment = 'fixed';
                    }
                    setStyles(newStyles);
                    container.classList.add('loaded');
                }
            });
        };
        if (lazyDisabled) {
            // only runs if lazy load is disabled
            var container = containerRef;
            processImg(container);
        }
        else if (inView && intersectionElement) {
            // only runs if
            var container = intersectionElement.target;
            processImg(container);
        }
    }, [backgroundImage, dimensions.width, dimensions.height, inView, sizes]);
    function setRef(el) {
        refIntersectionObserver(el);
        containerRef = el;
    }
    return (<div className={containerClasses} ref={wrap} style={props.style}>
      {resizeListener}
      <div className="lm-background__absolute-fill lm-background-image lm-background__blurred" style={initialState}>
      </div>
      <div className={backgroundClasses} ref={setRef} style={styles}>
      </div>
      {props.children}
    </div>);
};
export default WithBackgroundImage;
