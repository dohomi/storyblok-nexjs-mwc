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
import ImageListItem from './ImageListItem';
import ImageListLightbox from './ImageListLightbox';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import clsx from 'clsx';
import { useGridListStyles } from '../card/cardListStyles';
import { useImageListStyles } from './useImageListStyles';
var ImageList = function (props) {
    var _a;
    var content = props.content;
    var classes = useImageListStyles();
    var gridClasses = useGridListStyles({
        columnCount: content.column_count,
        columnCountPhone: content.column_count_phone,
        columnCountTablet: content.column_count_tablet,
        isMasonry: !!content.masonry
    });
    var dimensions = useWindowDimensions();
    var containerRef = React.createRef();
    var _b = useState(''), lightbox = _b[0], setLightbox = _b[1];
    var gutterSize = content.column_gap ? Number(content.column_gap) : 2;
    function onImageClick(element) {
        // open lightbox
        content.enable_lightbox && setLightbox(element._uid);
    }
    var body = content.body || [];
    var gridListProps = {
        spacing: gutterSize
        // cols: columnCount
    };
    if (content.masonry) {
        gridListProps.spacing = 0;
        delete gridListProps.cols;
        gridListProps.style = {
            // columnCount: columnCount,
            columnGap: gutterSize + "px"
        };
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: containerRef, style: {
                padding: gutterSize + 'px'
            }, className: clsx(classes.root, (_a = {},
                _a[classes.masonry] = content.masonry,
                _a[classes.aspectRatio] = content.aspect_ratio && !content.masonry,
                _a['ratio-' + content.aspect_ratio] = content.aspect_ratio,
                _a['with-lightbox'] = content.enable_lightbox,
                _a)) },
            React.createElement(GridList, __assign({ cellHeight: 'auto', className: gridClasses.gridList }, gridListProps), body.map(function (item, i) { return (React.createElement(SbEditable, { content: item, key: item._uid },
                React.createElement(GridListTile, { style: {
                        padding: !content.masonry ? gutterSize + "px" : undefined,
                        marginBottom: content.masonry ? gutterSize + "px" : undefined
                    }, onClick: function (ev) { return onImageClick(__assign({ _uid: item._uid, count: i }, ev)); } },
                    React.createElement(ImageListItem, { content: item, listProps: content })))); }))),
        lightbox && ImageListLightbox({
            elements: body,
            lightbox: lightbox,
            setLightbox: setLightbox,
            dimensions: dimensions,
            onImageClick: onImageClick,
            className: classes.lightbox
        })));
};
export default ImageList;
