import clsx from 'clsx';
import ReactPlayer from 'react-player';
import BackgroundImageContainer from './BackgroundImage';
import * as React from 'react';
import { useState } from 'react';
const FullscreenVideoBg = (content) => {
    const properties = content.property || [];
    const videoAspect = content.ratioHeight / content.ratioWidth;
    // let fixedToRatio = content.fixedToRatio
    const [error, setError] = useState(false);
    const className = clsx('react-player');
    if (!content.url) {
        return (React.createElement("div", null, "please insert a video URL"));
    }
    const playerProps = {
        loop: properties.includes('loop'),
        playing: properties.includes('autoplay'),
        muted: properties.includes('muted'),
        controls: properties.includes('controls'),
        playsinline: properties.includes('playsinline'),
        onError: () => setError(true)
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
    const windowWidth = content.containerDimensions.width;
    const windowHeight = content.containerDimensions.height;
    const windowAspect = windowHeight / windowWidth;
    let vidBgWidth = '100%';
    if (windowAspect > videoAspect) {
        vidBgWidth = (windowAspect / videoAspect * 100).toFixed(2) + '%';
    }
    // cover the available space
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `videobg-width${properties.includes('suppress_mouse_events') ? ' video-no-mouse' : ''}`, style: { width: vidBgWidth } },
            React.createElement("div", { className: "videobg-aspect", style: { paddingBottom: `${(videoAspect * 100).toFixed(2)}%` } },
                React.createElement("div", { className: "videobg-make-height" },
                    React.createElement(ReactPlayer, Object.assign({ url: content.url, className: className, width: "100%", height: "100%" }, playerProps))))),
        error && content.fallback_image && React.createElement(BackgroundImageContainer, { content: {
                image: content.fallback_image,
                _uid: `bg_fallback_${content._uid}`,
                component: 'background'
            } })));
};
export default FullscreenVideoBg;
