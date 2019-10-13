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
import Components from 'components';
import SbEditable from 'storyblok-react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var FullscreenVideoBg = dynamic(function () { return import('./FullscreenVideoBg'); }, { ssr: false });
var SectionVideoBg = function (_a) {
    var content = _a.content;
    var dimensions = useWindowDimensions();
    var _b = __read(useInView({
        triggerOnce: true,
        rootMargin: '300px 0px 300px 0px'
    }), 3), intersectionRef = _b[0], inView = _b[1], intersectionElement = _b[2];
    var _c = __read(useState({
        width: 0,
        height: 0
    }), 2), containerDimensions = _c[0], setContainerDimensions = _c[1];
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
        containerStyle.minHeight = content.height + "vh";
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
    return (<SbEditable content={content}>
      <div className="lm-content-section lm-video-section" style={containerStyle} ref={intersectionRef}>
        {hasSrc && inView && (<FullscreenVideoBg {...content} containerDimensions={containerDimensions} fixedToRatio={fixedToRatio} ratioHeight={ratioHeight} ratioWidth={ratioWidth}/>)}
        {hasBody && body.map(function (blok) { return Components(blok); })}
      </div>
    </SbEditable>);
};
export default SectionVideoBg;
