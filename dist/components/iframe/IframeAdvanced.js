import SbEditable from 'storyblok-react';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { intersectionIframeOptions } from '../../utils/intersectionObserverConfig';
import CircularProgress from '@material-ui/core/CircularProgress';
const IframeAdvanced = ({ content }) => {
    const [refIntersectionObserver, inView, containerRef] = useInView(intersectionIframeOptions);
    const iframeRef = createRef();
    // const [src, setSrc] = useState<string>('')
    const contentId = `iframe_${content._uid}`;
    const properties = content.property || [];
    const allowed = content.allow || [];
    const [loaded, setLoaded] = useState(false);
    const src = useMemo(() => {
        if (inView) {
            return content.url;
        }
        return '';
    }, [inView]);
    useEffect(() => {
        const messageFunc = (message) => {
            const clientHeight = message && message.data && message.data[content.incoming_message_key || 'stClientHeight'];
            const el = containerRef && containerRef.target && containerRef.target.firstChild;
            if (clientHeight && el) {
                const iframe = el;
                iframe.style.minHeight = clientHeight + 'px';
            }
        };
        const clickFunc = () => {
            const el = containerRef && containerRef.target && containerRef.target.firstChild;
            if (el) {
                const iframe = el;
                const contentWindow = iframe.contentWindow;
                contentWindow && contentWindow.postMessage(content.post_message_key || '_clickOutside', '*');
            }
        };
        window.addEventListener('message', messageFunc);
        window.addEventListener('click', clickFunc);
        return () => {
            window.removeEventListener('message', messageFunc);
            window.removeEventListener('click', clickFunc);
        };
    }, [containerRef]);
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: refIntersectionObserver },
            !loaded && inView && React.createElement("div", { className: "p-5" },
                React.createElement(CircularProgress, null)),
            React.createElement("iframe", { ref: iframeRef, id: contentId, allow: allowed.join(' '), frameBorder: 0, scrolling: "no", onLoad: () => setLoaded(true), allowFullScreen: properties.includes('allow_fullscreen') || false, src: src, className: "border-0", style: {
                    overflowY: 'hidden',
                    display: content.display,
                    height: '100%',
                    minHeight: content.height ? `${content.height}px` : undefined,
                    width: content.width || '100%'
                } }))));
};
export default IframeAdvanced;
