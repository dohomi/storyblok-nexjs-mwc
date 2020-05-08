import { getImageAttrs } from '../../utils/ImageService';
import React, { useState } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import ImageShadow from './ImageShadow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
var useStyles = makeStyles(function (theme) {
    var _a;
    return createStyles({
        root: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // zIndex: 0
            '&.lm-fixed-bg': (_a = {
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    // backgroundSize: 'initial', // not sure why this was set before
                    '&.lm-fixed-bg__top': {
                        backgroundPosition: 'top'
                    }
                },
                _a[theme.breakpoints.down('sm') + 'and (orientation: portrait)'] = {
                    backgroundPosition: 'center',
                    backgroundAttachment: 'scroll'
                },
                _a[theme.breakpoints.down('sm') + 'and (orientation: landscape)'] = {
                    backgroundPosition: 'center',
                    backgroundAttachment: 'scroll'
                },
                _a)
        }
    });
});
var BackgroundImage = function (_a) {
    var content = _a.content, backgroundStyle = _a.backgroundStyle;
    if (!content.image) {
        return null;
    }
    var image = content.image;
    var classes = useStyles();
    var _b = useWindowDimensions(), isDesktop = _b.isDesktop, width = _b.width, height = _b.height;
    var _c = useState(), imgSrc = _c[0], setImgSrc = _c[1];
    var _d = useInView(intersectionDefaultOptions), viewRef = _d[0], inView = _d[1], anchorRef = _d[2];
    var theme = useTheme();
    var matches = useMediaQuery(theme.breakpoints.down(content.hide_image_on_breakpoint || 'xs'));
    var disableSmartCrop = content.disable_smart_crop;
    var imageFocalPoint = content.image_focal_point;
    var imageAttrs = { src: '', srcSet: '' };
    var current = anchorRef && anchorRef.target;
    if (content.hide_image_on_breakpoint && matches) {
        return null; // don't render if image hidden
    }
    if (current && inView && image) {
        var currentWidth = current.clientWidth;
        var currentHeight = current.clientHeight;
        if (isDesktop) {
            if (backgroundStyle === 'fixed_cover') {
                currentWidth = width;
                currentHeight = height;
            }
            else if (backgroundStyle === 'fixed_image') {
                currentHeight = currentHeight + 200;
                currentWidth = currentWidth + 200;
            }
        }
        var isAlternativeSource = content.alternative_image && height > width;
        imageAttrs = getImageAttrs({
            originalSource: isAlternativeSource ? content.alternative_image : image,
            width: currentWidth,
            height: currentHeight,
            smart: !disableSmartCrop,
            focalPoint: !isAlternativeSource ? imageFocalPoint : undefined
        });
    }
    // const imgSrc = useGetSrcHook(imageAttrs)
    return (React.createElement(React.Fragment, null,
        !imgSrc && React.createElement(Skeleton, { width: '100%', height: '100%', style: { position: 'absolute' }, variant: "rect" }),
        React.createElement(ImageShadow, { src: imageAttrs.src, srcSet: imageAttrs.srcSet, afterLoad: setImgSrc }),
        React.createElement(Fade, { in: !!imgSrc, timeout: 1000 },
            React.createElement("div", { className: clsx(classes.root, {
                    'lm-fixed-bg': backgroundStyle === 'fixed_image' || backgroundStyle === 'fixed_cover',
                    'lm-fixed-bg__top': backgroundStyle === 'fixed_image',
                    'lm-fixed-bg__center': backgroundStyle === 'fixed_cover'
                }), style: {
                    backgroundImage: imgSrc && "url('" + imgSrc + "')",
                    backgroundSize: content.background_size ? content.background_size : undefined,
                    backgroundPosition: content.background_position ? content.background_position : undefined
                }, ref: viewRef }))));
};
export default BackgroundImage;
