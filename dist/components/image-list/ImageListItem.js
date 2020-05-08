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
import * as React from 'react';
import { useState } from 'react';
import { Fade, GridListTileBar } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';
import { getImageAttrs } from '../../utils/ImageService';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { Skeleton } from '@material-ui/lab';
import ContentLink from '../link/ContentLink';
var ImageListItemWrap = function (_a) {
    var content = _a.content, children = _a.children;
    var _b;
    return ((_b = content.link) === null || _b === void 0 ? void 0 : _b.cached_url) ? React.createElement(ContentLink, { className: 'img-list-item', content: content }, children)
        : React.createElement(React.Fragment, null, children);
};
var ImageListItem = function (props) {
    var content = props.content, listProps = props.listProps;
    var _a = useInView(intersectionDefaultOptions), inViewRef = _a[0], inView = _a[1], currentRef = _a[2];
    var _b = useState(false), loaded = _b[0], setLoaded = _b[1];
    // const width = listProps.width
    var styles = {};
    var imageProps = {};
    if (inView && content.source && (currentRef === null || currentRef === void 0 ? void 0 : currentRef.target)) {
        // if (listProps.image_crop && !listProps.masonry /*|| (!listProps.masonry && !listProps.fit_in_color)*/) {
        //   height = listProps.height
        // }
        var tile = currentRef.target.closest('.MuiGridListTile-root');
        var width = tile === null || tile === void 0 ? void 0 : tile.clientWidth;
        var height = tile === null || tile === void 0 ? void 0 : tile.clientHeight;
        if (!width) {
            return React.createElement("span", null, "some error with image list item");
        }
        width = Math.ceil(width);
        var respectImgRatio = listProps.masonry || !listProps.aspect_ratio || !listProps.image_crop;
        height = respectImgRatio ? 0 : height && Math.ceil(height);
        var imgSrc = getImageAttrs({
            originalSource: content.source,
            width: width,
            height: height,
            smart: listProps.image_crop === 'smart',
            fitInColor: listProps.fit_in_color
        });
        imageProps = __assign(__assign({}, imgSrc), { width: width ? width : undefined, height: height ? height : undefined });
    }
    function onLoad() {
        setLoaded(true);
    }
    return (React.createElement(ImageListItemWrap, { content: content },
        !loaded && React.createElement(Skeleton, { width: '100%', height: '100%', style: { position: 'absolute' }, variant: "rect" }),
        React.createElement(Fade, { in: loaded },
            React.createElement("img", __assign({}, imageProps, { ref: inViewRef, style: styles, alt: 'image list item', onLoad: onLoad }))),
        (content.label || content.sub_title) &&
            React.createElement(GridListTileBar, { title: content.label, subtitle: content.sub_title, titlePosition: listProps.label_position || 'bottom' })));
};
export default ImageListItem;
