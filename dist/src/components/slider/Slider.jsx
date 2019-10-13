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
import Components from 'components';
import SwipeableViews from 'react-swipeable-views';
import React, { memo, useState } from 'react';
import clsx from 'clsx';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var chunkArray = function (myArray, chunkSize) {
    var results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }
    return results;
};
var Child = function (_a) {
    var body = _a.body, sectionVariant = _a.sectionVariant;
    return (<div className="d-flex h-100 lm-slider__container flex-row justify-content-center">
      {body.map(function (item) {
        if (item.component === 'section') {
            var newOpts = __assign(__assign({}, item), { presetVariant: {
                    variant: sectionVariant || 'transparent'
                } });
            return Components(newOpts);
        }
        return <div key={"child_" + item._uid} className="flex-grow-1">{Components(item)}</div>;
    })}
    </div>);
};
var Slider = function (_a) {
    var content = _a.content;
    var _b = __read(useState(0), 2), slide = _b[0], setSlide = _b[1];
    var dimensions = useWindowDimensions();
    var wrapInColumns = content.slides_per_view && !dimensions.isMobile;
    var contentBody = content.body || [];
    var body = wrapInColumns ? chunkArray(contentBody.slice(0), content.slides_per_view) : contentBody;
    var properties = content.property || [];
    var styles = {};
    var paginationClasses = clsx('carousel-indicators', { 'd-none': properties.includes('hide_pagination') });
    var carouselPrevClasses = clsx('carousel-control-prev', { 'd-none': properties.includes('hide_arrows') });
    var carouselNextClasses = clsx('carousel-control-next', { 'd-none': properties.includes('hide_arrows') });
    var carouselClasses = clsx('carousel slide', properties.map(function (i) { return 'carousel__' + i; }));
    function handleChangeIndex(item) {
        setSlide(body.findIndex(function (i) { return i._uid === item._uid; }));
    }
    if (content.background_color) {
        styles.backgroundColor = content.background_color && content.background_color.rgba;
    }
    return (<SbEditable content={content}>
      <div className={carouselClasses} style={styles}>
        <SwipeableViews index={slide} onChangeIndex={function (i) { return setSlide(i); }}>
          {wrapInColumns ? body.map(function (child, index) {
        return <Child key={"swipeable_" + index} body={child} sectionVariant={content.section_variant}/>;
    }) : body.map(function (item) {
        if (item.component === 'section') {
            var newOpts = __assign(__assign({}, item), { presetVariant: {
                    variant: content.section_variant || 'transparent'
                } });
            return Components(newOpts);
        }
        return Components(item);
    })}
        </SwipeableViews>
        <a className={carouselPrevClasses} role="button" onClick={function () { return setSlide(slide === 0 ? body.length - 1 : slide - 1); }}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className={carouselNextClasses} role="button" onClick={function () { return setSlide(slide === body.length - 1 ? 0 : slide + 1); }}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
        <ol className={paginationClasses}>
          {body.map(function (item, i) { return (<li className={"" + (slide === i ? 'active' : '')} key={item._uid || "pagination_" + i} onClick={function () { return handleChangeIndex(item); }}>
            </li>); })}
        </ol>
      </div>
    </SbEditable>);
};
export default memo(Slider);
