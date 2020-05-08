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
const Motion = ({ content }) => {
    const type = content.type || 'fade';
    const options = {
        triggerOnce: true
    };
    if (content.threshold) {
        options.threshold = Number((Number(content.threshold) / 100).toFixed(2));
    }
    const [viewRef, inView] = useInView(options);
    const transitionProps = {};
    if (content.duration) {
        transitionProps.timeout = Number(content.duration);
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: viewRef }, {
            'slide': (React.createElement(Slide, Object.assign({ in: inView }, transitionProps, { direction: content.slide_direction || 'down' }),
                React.createElement("div", null, (content.body || []).map((blok) => Components(blok))))),
            'fade': (React.createElement(Fade, Object.assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map((blok) => Components(blok))))),
            'grow': (React.createElement(Grow, Object.assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map((blok) => Components(blok))))),
            'zoom': (React.createElement(Zoom, Object.assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map((blok) => Components(blok))))),
            'collapse': (React.createElement(Collapse, Object.assign({ in: inView }, transitionProps),
                React.createElement("div", null, (content.body || []).map((blok) => Components(blok)))))
        }[type])));
};
export default Motion;
