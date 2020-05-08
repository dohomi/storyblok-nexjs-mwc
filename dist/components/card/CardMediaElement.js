import { getImageAttrs } from '../../utils/ImageService';
import * as React from 'react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import CardMedia from '@material-ui/core/CardMedia';
import { Fade } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ImageShadow from '../section/ImageShadow';
var CardMediaElement = function (_a) {
    var children = _a.children, content = _a.content, options = _a.options;
    var _b = useInView(intersectionDefaultOptions), reference = _b[0], inView = _b[1], intersecRef = _b[2];
    var _c = useState(''), imgSource = _c[0], setImgSource = _c[1];
    var contentImage = content.image;
    var img = { src: '', srcSet: '' };
    var imageSize = options.image_size;
    if (inView && contentImage && intersecRef && intersecRef.target) {
        var mediaEl = intersecRef === null || intersecRef === void 0 ? void 0 : intersecRef.target;
        var currentWidth = (mediaEl === null || mediaEl === void 0 ? void 0 : mediaEl.clientWidth) || 0;
        var currentHeight = mediaEl === null || mediaEl === void 0 ? void 0 : mediaEl.clientHeight;
        img = getImageAttrs({
            originalSource: contentImage,
            width: currentWidth,
            height: ['contain', 'initial', 'auto'].includes(imageSize) ? 0 : currentHeight,
            smart: true
        });
    }
    return (React.createElement(React.Fragment, null,
        !imgSource && React.createElement(Skeleton, { style: { position: 'absolute' }, width: '100%', height: '100%', variant: "rect" }),
        React.createElement(ImageShadow, { src: img.src, srcSet: img.srcSet, afterLoad: setImgSource }),
        React.createElement(Fade, { in: !!imgSource },
            React.createElement(CardMedia, { style: {
                    color: options.variant && options.variant.includes('font_white') ? 'white' : 'inherit',
                    backgroundSize: imageSize || 'cover'
                }, image: imgSource, ref: reference },
                !imgSource && React.createElement("div", null),
                children))));
};
export default CardMediaElement;
