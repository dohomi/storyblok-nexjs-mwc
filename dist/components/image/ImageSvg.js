import { useInView } from 'react-intersection-observer';
import SbEditable from 'storyblok-react';
import SVG from 'react-inlinesvg';
import * as React from 'react';
import { useState } from 'react';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Fade } from '@material-ui/core';
var useStyles = makeStyles({
    root: {
        display: 'inline-block'
    },
    svg: {
        display: 'inline-block',
        width: 120,
        height: 120,
        '&.has-color': {
            '& path': {
                fill: 'currentColor'
            }
        }
    }
});
var ImageSvg = function (_a) {
    var content = _a.content;
    var classes = useStyles();
    var _b = useInView(intersectionDefaultOptions), refIntersectionObserver = _b[0], inView = _b[1];
    var src = inView ? content.source : '';
    var _c = useState(false), loaded = _c[0], setLoaded = _c[1];
    var afterSvgLoaded = function () {
        setLoaded(true);
    };
    var onErrorHandler = function (error) {
        console.error(error);
    };
    var fitInColor = (content.color && content.color.rgba) || content.fit_in_color; // legacy fit_in_color
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Fade, { in: loaded },
            React.createElement("div", { className: classes.root, ref: refIntersectionObserver }, !!src && React.createElement(SVG, { src: src, style: {
                    color: fitInColor,
                    width: content.width && content.width + "px",
                    height: content.height && content.height + "px"
                }, onLoad: afterSvgLoaded, onError: onErrorHandler, className: clsx(classes.svg, {
                    'has-color': !!fitInColor
                }) })))));
};
export default ImageSvg;
