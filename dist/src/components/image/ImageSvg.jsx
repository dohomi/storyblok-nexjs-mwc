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
import { useInView } from 'react-intersection-observer';
import SbEditable from 'storyblok-react';
import SVG from 'react-inlinesvg';
var ImageSvg = function (_a) {
    var content = _a.content;
    var _b = __read(useInView({
        triggerOnce: true,
        rootMargin: '300px 0px 300px 0px'
    }), 3), refIntersectionObserver = _b[0], inView = _b[1], el = _b[2];
    var src = inView ? content.source : '';
    var afterSvgLoaded = function () {
        // @ts-ignore
        el.target.classList.add('loaded');
    };
    var onErrorHandler = function (error) {
        console.error(error);
    };
    var fitInColor = (content.color && content.color.rgba) || content.fit_in_color; // legacy fit_in_color
    var svgStyle = {};
    fitInColor && (svgStyle.color = fitInColor);
    content.width && (svgStyle.width = content.width + "px");
    content.height && (svgStyle.height = content.height + "px");
    console.log('image svg', src);
    return (<SbEditable content={content}>
      <div className="w-100 progressive-img-container" ref={refIntersectionObserver}>
        <SVG src={src} style={svgStyle} onLoad={afterSvgLoaded} onError={onErrorHandler} className="lm-svg-img"/>
      </div>
    </SbEditable>);
};
export default ImageSvg;
