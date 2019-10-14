var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import clsx from 'clsx';
import ReactPlayer from 'react-player';
import BackgroundImageContainer from './BackgroundImageContainer';
import { useState } from 'react';
var FullscreenVideoBg = function (content) {
    var properties = content.property || [];
    var videoAspect = content.ratioHeight / content.ratioWidth;
    var fixedToRatio = content.fixedToRatio;
    var _a = __read(useState(false), 2), error = _a[0], setError = _a[1];
    var className = clsx('react-player');
    if (!content.url) {
        return (<div>please insert a video URL</div>);
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
    if (fixedToRatio) {
        return (<div style={{ paddingBottom: (videoAspect * 100).toFixed(2) + "%", position: 'relative', width: '100%' }}>
        <ReactPlayer url={content.url} className={className} width="100%" height="100%" {...playerProps}/>
      </div>);
    }
    // calculate video container to fit into available space
    var windowWidth = content.containerDimensions.width;
    var windowHeight = content.containerDimensions.height;
    var windowAspect = windowHeight / windowWidth;
    var vidBgWidth = '100%';
    if (windowAspect > videoAspect) {
        vidBgWidth = (windowAspect / videoAspect * 100).toFixed(2) + '%';
    }
    // cover the available space
    return (<>
      <div className={"videobg-width" + (properties.includes('suppress_mouse_events') ? ' video-no-mouse' : '')} style={{ width: vidBgWidth }}>
        <div className="videobg-aspect" style={{ paddingBottom: (videoAspect * 100).toFixed(2) + "%" }}>
          <div className="videobg-make-height">
            <ReactPlayer url={content.url} className={className} width="100%" height="100%" {...playerProps}/>
          </div>
        </div>
      </div>
      {error && content.fallback_image && <BackgroundImageContainer image={content.fallback_image}/>}
    </>);
};
export default FullscreenVideoBg;
