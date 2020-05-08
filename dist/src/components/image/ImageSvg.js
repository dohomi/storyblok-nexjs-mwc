import { useInView } from 'react-intersection-observer';
import SbEditable from 'storyblok-react';
import SVG from 'react-inlinesvg';
import * as React from 'react';
import { useState } from 'react';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Fade } from '@material-ui/core';
const useStyles = makeStyles({
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
const ImageSvg = ({ content }) => {
    const classes = useStyles();
    const [refIntersectionObserver, inView] = useInView(intersectionDefaultOptions);
    const src = inView ? content.source : '';
    const [loaded, setLoaded] = useState(false);
    const afterSvgLoaded = () => {
        setLoaded(true);
    };
    const onErrorHandler = (error) => {
        console.error(error);
    };
    const fitInColor = (content.color && content.color.rgba) || content.fit_in_color; // legacy fit_in_color
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Fade, { in: loaded },
            React.createElement("div", { className: classes.root, ref: refIntersectionObserver }, !!src && React.createElement(SVG, { src: src, style: {
                    color: fitInColor,
                    width: content.width && `${content.width}px`,
                    height: content.height && `${content.height}px`
                }, onLoad: afterSvgLoaded, onError: onErrorHandler, className: clsx(classes.svg, {
                    'has-color': !!fitInColor
                }) })))));
};
export default ImageSvg;
