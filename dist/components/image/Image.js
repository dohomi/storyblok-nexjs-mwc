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
import SbEditable from 'storyblok-react';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import { getImageAttrs } from '../../utils/ImageService';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        display: 'inline-block',
        margin: '0 0 -6px 0 !important',
        overflow: 'auto',
        padding: 0,
        position: 'relative'
    },
    rootNoMargin: {
        margin: '0 !important'
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        '&.img-thumbnail': {
            padding: '.25rem',
            backgroundColor: theme.palette.background.default,
            border: "1px solid " + theme.palette.divider,
            borderRadius: theme.shape.borderRadius
        },
        '&.square, &.rounded-0': {
            borderRadius: 0
        },
        '&.rounded': {
            borderRadius: theme.shape.borderRadius
        },
        '&.rounded-circle': {
            borderRadius: '50%'
        }
    }
}); });
var Image = function (_a) {
    var _b;
    var content = _a.content;
    var _c, _d;
    var classes = useStyles();
    var winDims = useWindowDimensions();
    var isMobile = winDims.isMobile;
    var _e = useState(false), loaded = _e[0], setLoaded = _e[1];
    var imageCrop = content.image_crop || [];
    var property = content.property || [];
    var fitInColor = (content.color && content.color.rgba) || content.fit_in_color;
    var _f = useInView(intersectionDefaultOptions), refIntersectionObserver = _f[0], inView = _f[1], intersectionElement = _f[2];
    var imgProperties = {
        src: '',
        srcSet: ''
    };
    var definedHeight = content.height_xs && isMobile ? content.height_xs : content.height;
    if (inView && content.source && intersectionElement) {
        var parentElement = intersectionElement.target.parentElement;
        var grandparentElement = (_c = intersectionElement.target.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
        // console.log('parent element', hasDefinedSize, isInGrid, parentElement?.clientWidth, parentElement?.clientHeight, grandparentElement?.clientWidth, grandparentElement?.clientHeight)
        var parentDim = {
            width: (parentElement === null || parentElement === void 0 ? void 0 : parentElement.clientWidth) || 0,
            height: (parentElement === null || parentElement === void 0 ? void 0 : parentElement.clientHeight) || 0
        };
        var grandParentDim = {
            width: (grandparentElement === null || grandparentElement === void 0 ? void 0 : grandparentElement.clientWidth) || 0,
            height: (grandparentElement === null || grandparentElement === void 0 ? void 0 : grandparentElement.clientHeight) || 0
        };
        var square = property.includes('rounded-circle') || property.includes('square');
        var definedWidth = content.width;
        var width = Math.ceil(parentDim.width || winDims.width);
        if ((!definedWidth && !definedHeight) || imageCrop.length || fitInColor) {
            // default: set available width to the current width either in crop mode
            definedWidth = definedWidth || (parentDim.height / parentDim.width) * 100 > 300 ? grandParentDim.width : width;
        }
        if (square) {
            // overwrite if square
            var iconSize = definedHeight || definedWidth || 64;
            definedWidth = iconSize;
            definedHeight = iconSize;
        }
        if (content.height_fill) {
            // with a tolerance of 200 height should fit grandparents height
            if (grandParentDim.height === parentDim.height) {
                definedHeight = Math.ceil(grandParentDim.height);
            }
        }
        if (content.focal_point && parentElement && !definedHeight) {
            if (parentDim) {
                definedHeight = Math.ceil(parentDim.height);
            }
        }
        var imgRatio = {
            width: Number(definedWidth || 0),
            height: definedHeight
        };
        imgProperties = getImageAttrs(__assign(__assign({ originalSource: content.source }, imgRatio), { fitInColor: fitInColor, focalPoint: content.focal_point, smart: imageCrop.includes('smart_crop') }));
    }
    function onImageLoaded() {
        setLoaded(true);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("figure", { ref: refIntersectionObserver, className: clsx(classes.root, (_b = {},
                _b[classes.rootNoMargin] = content.disable_ratio_correction,
                _b)), style: {
                height: content.height ? content.height + "px" : content.height_fill ? '100%' : undefined,
                width: content.width ? content.width + "px" : content.height_fill ? '100%' : undefined
            } },
            !loaded && React.createElement(Skeleton, { style: { position: 'absolute' }, width: '100%', height: '100%', variant: property.includes('rounded-circle') ? 'circle' : 'rect' }),
            React.createElement(Fade, { in: loaded }, !imgProperties.src ? React.createElement("span", null) : React.createElement("img", __assign({}, imgProperties, { alt: content.alt || 'website image', width: content.width ? content.width : undefined, height: definedHeight ? definedHeight : undefined, style: {
                    width: content.width ? content.width + "px" : 'auto',
                    maxHeight: 'inherit',
                    height: definedHeight ? definedHeight + "px" : 'auto'
                }, className: clsx(classes.image, content.property, (_d = content.class_names) === null || _d === void 0 ? void 0 : _d.values), onLoad: onImageLoaded }))))));
};
export default Image;
