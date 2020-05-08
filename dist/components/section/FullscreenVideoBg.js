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
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import BackgroundImageContainer from './BackgroundImage';
import * as React from 'react';
import { useState } from 'react';
var FullscreenVideoBg = function (content) {
    var properties = content.property || [];
    var videoAspect = content.ratioHeight / content.ratioWidth;
    // let fixedToRatio = content.fixedToRatio
    var _a = useState(false), error = _a[0], setError = _a[1];
    var className = clsx('react-player');
    if (!content.url) {
        return (React.createElement("div", null, "please insert a video URL"));
    }
    var playerProps = {
        loop: properties.includes('loop'),
        playing: properties.includes('autoplay'),
        muted: properties.includes('muted'),
        controls: properties.includes('controls'),
        playsinline: properties.includes('playsinline'),
        onError: function () { return setError(true); }
    };
    // render video based on video ratio
    // if (fixedToRatio) {
    //   return (
    //     <div style={{ paddingBottom: `${(videoAspect * 100).toFixed(2)}%`, position: 'relative', width: '100%' }}>
    //       <ReactPlayer url={content.url}
    //                    className={className}
    //                    width="100%"
    //                    height="100%"
    //                    {...playerProps} />
    //     </div>
    //   )
    // }
    // calculate video container to fit into available space
    var windowWidth = content.containerDimensions.width;
    var windowHeight = content.containerDimensions.height;
    var windowAspect = windowHeight / windowWidth;
    var vidBgWidth = '100%';
    if (windowAspect > videoAspect) {
        vidBgWidth = (windowAspect / videoAspect * 100).toFixed(2) + '%';
    }
    // cover the available space
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "videobg-width" + (properties.includes('suppress_mouse_events') ? ' video-no-mouse' : ''), style: { width: vidBgWidth } },
            React.createElement("div", { className: "videobg-aspect", style: { paddingBottom: (videoAspect * 100).toFixed(2) + "%" } },
                React.createElement("div", { className: "videobg-make-height" },
                    React.createElement(ReactPlayer, __assign({ url: content.url, className: className, width: "100%", height: "100%" }, playerProps))))),
        error && content.fallback_image && React.createElement(BackgroundImageContainer, { content: {
                image: content.fallback_image,
                _uid: "bg_fallback_" + content._uid,
                component: 'background'
            } })));
};
export default FullscreenVideoBg;
