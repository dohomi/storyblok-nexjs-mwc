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
import React from 'react';
import { getImageAttrs, getOriginalImageDimensions } from '../../utils/ImageService';
import SwipeableViews from 'react-swipeable-views';
import InvertedIndicator from '../slider/InvertedIndicator';
import { ChevronLeft, ChevronRight } from 'mdi-material-ui';
var Swipe = function (props) {
    var currentIndex = props.elements.findIndex(function (i) { return i._uid === props.lightbox; });
    function getImageSource(source) {
        var dimensionHeight = props.dimensions.height - 68 - 16;
        var dimensionWidth = props.dimensions.width - 48;
        var originalDimension = getOriginalImageDimensions(source);
        var imgWidth = originalDimension.width;
        var imgHeight = originalDimension.height;
        dimensionWidth = imgWidth <= dimensionWidth ? imgWidth : dimensionWidth;
        dimensionHeight = imgHeight <= dimensionHeight ? imgHeight : dimensionHeight;
        var landscape = dimensionWidth > dimensionHeight;
        return getImageAttrs({
            originalSource: source,
            width: landscape ? 0 : dimensionWidth,
            height: landscape ? dimensionHeight : 0
        });
    }
    function handleChangeIndex(index) {
        props.onImageClick(props.elements[index]);
    }
    return (React.createElement("div", { className: "carousel slide" },
        React.createElement(SwipeableViews, { index: currentIndex, className: "carousel-inner", onChangeIndex: handleChangeIndex }, props.elements.map(function (item) { return (React.createElement("div", { key: item._uid, className: "carousel-item" },
            React.createElement("figure", { className: "d-block" },
                React.createElement("img", __assign({}, getImageSource(item.source), { className: 'img-fluid' }))))); })),
        React.createElement("a", { className: "carousel-control-prev", role: "button", onClick: function () { return props.onImageClick(currentIndex === 0 ? props.elements[props.elements.length - 1] : props.elements[currentIndex - 1]); } },
            React.createElement(ChevronLeft, null)),
        React.createElement("a", { className: "carousel-control-next", role: "button", onClick: function () { return props.onImageClick(currentIndex === props.elements.length - 1 ? props.elements[0] : props.elements[currentIndex + 1]); } },
            React.createElement(ChevronRight, null)),
        React.createElement("ol", { className: "carousel-indicators" }, props.elements.map(function (item) { return (React.createElement(InvertedIndicator, { key: item._uid, active: props.lightbox === item._uid, color: 'light', onClick: function () { return props.onImageClick(item); } })); }))));
};
export default Swipe;
