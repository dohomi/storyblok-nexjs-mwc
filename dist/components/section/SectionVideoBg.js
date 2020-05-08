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
import Components from '@components';
import SbEditable from 'storyblok-react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { makeStyles } from '@material-ui/styles';
var FullscreenVideoBg = dynamic(function () { return import('./FullscreenVideoBg'); }, { ssr: false });
var useStyles = makeStyles({
    videoSection: {
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        height: '100%',
        alignItems: 'end',
        justifyItems: 'center',
        '& > div:last-of-type': {
            zIndex: 0,
            height: '100%',
            width: '100%',
            position: 'absolute'
        },
        '& .videobg': {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: '#111' /* bg color, if video is not high enough */
        },
        /* horizontally center the video */
        '& .videobg-width': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '-9999px',
            right: '-9999px',
            margin: 'auto'
        },
        /* set video aspect ratio and vertically center */
        '& .videobg-aspect': {
            position: 'absolute',
            width: '100%',
            height: 0,
            top: '-9999px',
            bottom: '-9999px',
            margin: 'auto',
            //padding-bottom: 56.25%; /* 16:9 ratio this is calculated inside the component */
            overflow: 'hidden'
        },
        '& .videobg-make-height': {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }
    // > .mdc-layout-grid {
    //     position: relative;
    //     z-index: 0;
    //   }
    // }
});
var SectionVideoBg = function (_a) {
    var content = _a.content;
    var classes = useStyles();
    var dimensions = useWindowDimensions();
    var _b = useInView(intersectionDefaultOptions), intersectionRef = _b[0], inView = _b[1], intersectionElement = _b[2];
    var _c = useState({
        width: 0,
        height: 0
    }), containerDimensions = _c[0], setContainerDimensions = _c[1];
    var hasSrc = !!content.url;
    var body = content.body || [];
    var hasBody = !!body.length;
    var fixedToRatio = !content.height; // enable fixed ratio if height is not set (!hasBody)
    var ratioHeight = 9;
    var ratioWidth = 16;
    if (content.video_ratio) {
        var ratio = content.video_ratio.split('x');
        ratioWidth = parseInt(ratio[0]);
        ratioHeight = parseInt(ratio[1]);
    }
    var containerStyle = {};
    if (content.height) {
        containerStyle.height = content.height + "vh"; // has errors.. on small devices
    }
    else {
        containerStyle.paddingBottom = ((ratioHeight / ratioWidth) * 100).toFixed(2) + "%";
    }
    useEffect(function () {
        if (inView) {
            if (!fixedToRatio && intersectionElement) {
                var current = intersectionElement.target;
                setContainerDimensions({
                    width: current.clientWidth,
                    height: current.clientHeight
                });
            }
        }
    }, [inView, dimensions.width, dimensions.height, content.url, fixedToRatio]);
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: classes.videoSection, style: containerStyle, ref: intersectionRef, id: content.section_identifier || content._uid },
            hasSrc && inView && (React.createElement(FullscreenVideoBg, __assign({}, content, { containerDimensions: containerDimensions, fixedToRatio: fixedToRatio, ratioHeight: ratioHeight, ratioWidth: ratioWidth }))),
            hasBody && React.createElement("div", null, body.map(function (blok) { return Components(blok); })))));
};
export default SectionVideoBg;
