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
import Components from '@components';
// import Fade, { FadeProps } from '@material-ui/core/Fade'
import { useInView } from 'react-intersection-observer';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import { Collapse } from '@material-ui/core';
import SbEditable from 'storyblok-react';
var Motion = function (_a) {
    var content = _a.content;
    var type = content.type || 'fade';
    var options = {
        triggerOnce: true
    };
    if (content.threshold) {
        options.threshold = Number((Number(content.threshold) / 100).toFixed(2));
    }
    var _b = useInView(options), viewRef = _b[0], inView = _b[1];
    var transitionProps = {};
    if (content.duration) {
        transitionProps.timeout = Number(content.duration);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: viewRef }, {
            'slide': (React.createElement(Slide, __assign({ in: inView }, transitionProps, { direction: content.slide_direction || 'down' }),
                React.createElement("div", null, (content.body || []).map(function (blok) { return Components(blok); })))),
            'fade': (React.createElement(Fade, __assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map(function (blok) { return Components(blok); })))),
            'grow': (React.createElement(Grow, __assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map(function (blok) { return Components(blok); })))),
            'zoom': (React.createElement(Zoom, __assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map(function (blok) { return Components(blok); })))),
            'collapse': (React.createElement(Collapse, __assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map(function (blok) { return Components(blok); }))))
        }[type])));
};
export default Motion;
