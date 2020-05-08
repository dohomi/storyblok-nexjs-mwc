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
const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // zIndex: 0
        '&.lm-fixed-bg': {
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            // backgroundSize: 'initial', // not sure why this was set before
            '&.lm-fixed-bg__top': {
                backgroundPosition: 'top'
            },
            [theme.breakpoints.down('sm') + 'and (orientation: portrait)']: {
                backgroundPosition: 'center',
                backgroundAttachment: 'scroll'
            },
            [theme.breakpoints.down('sm') + 'and (orientation: landscape)']: {
                backgroundPosition: 'center',
                backgroundAttachment: 'scroll'
            }
        }
    }
}));
const BackgroundImage = ({ content, backgroundStyle }) => {
    if (!content.image) {
        return null;
    }
    const image = content.image;
    const classes = useStyles();
    const { isDesktop, width, height } = useWindowDimensions();
    const [imgSrc, setImgSrc] = useState();
    const [viewRef, inView, anchorRef] = useInView(intersectionDefaultOptions);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(content.hide_image_on_breakpoint || 'xs'));
    const disableSmartCrop = content.disable_smart_crop;
    const imageFocalPoint = content.image_focal_point;
    let imageAttrs = { src: '', srcSet: '' };
    const current = anchorRef && anchorRef.target;
    if (content.hide_image_on_breakpoint && matches) {
        return null; // don't render if image hidden
    }
    if (current && inView && image) {
        let currentWidth = current.clientWidth;
        let currentHeight = current.clientHeight;
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
        const isAlternativeSource = content.alternative_image && height > width;
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
                    backgroundImage: imgSrc && `url('${imgSrc}')`,
                    backgroundSize: content.background_size ? content.background_size : undefined,
                    backgroundPosition: content.background_position ? content.background_position : undefined
                }, ref: viewRef }))));
};
export default BackgroundImage;
