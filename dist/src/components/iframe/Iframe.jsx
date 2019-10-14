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
import SbEditable from 'storyblok-react';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
var Iframe = function (_a) {
    var content = _a.content;
    var _b = __read(useInView({
        triggerOnce: true,
        rootMargin: '0px 0px 800px 0px'
    }), 2), refIntersectionObserver = _b[0], inView = _b[1];
    var iframeRef = React.createRef();
    var properties = content.property || [];
    var allowed = content.allow || [];
    useEffect(function () {
        if (inView) {
            var current = iframeRef.current;
            current && (current.src = content.url);
        }
    }, [inView, content.url]);
    var allow = '';
    if (Array.isArray(allowed) && allowed.length) {
        allow = allowed.join(' ');
    }
    return (<SbEditable content={content}>
      <div ref={refIntersectionObserver}>
        <iframe allow={allow} aria-hidden={true} frameBorder={0} allowFullScreen={properties.includes('allow_fullscreen') || false} height={content.height || '100%'} name={content.name || ''} width={content.width || '100%'} ref={iframeRef} style={{
        position: content.position || 'relative',
        display: content.display || 'block',
        height: content.height || '100%',
        width: content.width || '100%'
    }}/>
      </div>
    </SbEditable>);
};
export default Iframe;
