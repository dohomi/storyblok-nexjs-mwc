import SbEditable from 'storyblok-react';
import { useInView } from 'react-intersection-observer';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import Skeleton from '@material-ui/lab/Skeleton';
var Iframe = function (_a) {
    var _b;
    var content = _a.content;
    var _c = useInView(intersectionDefaultOptions), refIntersectionObserver = _c[0], inView = _c[1];
    var _d = useState(false), loaded = _d[0], setLoaded = _d[1];
    var urlSrc = useMemo(function () {
        if (inView) {
            return content.url;
        }
        return '';
    }, [inView]);
    var properties = content.property || [];
    var allowed = content.allow || [];
    content.responsive_ratio;
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { ref: refIntersectionObserver, className: clsx((_b = {
                    'embed-responsive': !!content.responsive_ratio
                },
                _b["embed-responsive-" + content.responsive_ratio] = !!content.responsive_ratio,
                _b)) },
            !loaded && React.createElement(Skeleton, { style: { position: 'absolute' }, width: '100%', height: '100%', variant: "rect" }),
            React.createElement("iframe", { allow: allowed.join(' '), src: urlSrc, "aria-hidden": true, frameBorder: 0, onLoad: function () { return setLoaded(true); }, className: clsx({ 'embed-responsive-item': !!content.responsive_ratio }), allowFullScreen: properties.includes('allow_fullscreen') || false, height: content.height || '100%', name: content.name || '', width: content.width || '100%', style: {
                    position: content.position,
                    display: content.display,
                    height: content.height || '100%',
                    width: content.width || '100%'
                } }))));
};
export default Iframe;
