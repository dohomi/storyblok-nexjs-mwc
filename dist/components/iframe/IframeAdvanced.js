import SbEditable from 'storyblok-react';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { intersectionIframeOptions } from '../../utils/intersectionObserverConfig';
import CircularProgress from '@material-ui/core/CircularProgress';
var IframeAdvanced = function (_a) {
    var content = _a.content;
    var _b = useInView(intersectionIframeOptions), refIntersectionObserver = _b[0], inView = _b[1], containerRef = _b[2];
    var iframeRef = createRef();
    // const [src, setSrc] = useState<string>('')
    var contentId = "iframe_" + content._uid;
    var properties = content.property || [];
    var allowed = content.allow || [];
    var _c = useState(false), loaded = _c[0], setLoaded = _c[1];
    var src = useMemo(function () {
        if (inView) {
            return content.url;
        }
        return '';
    }, [inView]);
    useEffect(function () {
        var messageFunc = function (message) {
            var clientHeight = message && message.data && message.data[content.incoming_message_key || 'stClientHeight'];
            var el = containerRef && containerRef.target && containerRef.target.firstChild;
            if (clientHeight && el) {
                var iframe = el;
                iframe.style.minHeight = clientHeight + 'px';
            }
        };
        var clickFunc = function () {
            var el = containerRef && containerRef.target && containerRef.target.firstChild;
            if (el) {
                var iframe = el;
                var contentWindow = iframe.contentWindow;
                contentWindow && contentWindow.postMessage(content.post_message_key || '_clickOutside', '*');
            }
        };
        window.addEventListener('message', messageFunc);
        window.addEventListener('click', clickFunc);
        return function () {
            window.removeEventListener('message', messageFunc);
            window.removeEventListener('click', clickFunc);
        };
    }, [containerRef]);
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: refIntersectionObserver },
            !loaded && inView && React.createElement("div", { className: "p-5" },
                React.createElement(CircularProgress, null)),
            React.createElement("iframe", { ref: iframeRef, id: contentId, allow: allowed.join(' '), frameBorder: 0, scrolling: "no", onLoad: function () { return setLoaded(true); }, allowFullScreen: properties.includes('allow_fullscreen') || false, src: src, className: "border-0", style: {
                    overflowY: 'hidden',
                    display: content.display,
                    height: '100%',
                    minHeight: content.height ? content.height + "px" : undefined,
                    width: content.width || '100%'
                } }))));
};
export default IframeAdvanced;
