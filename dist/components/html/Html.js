import SbEditable from 'storyblok-react';
import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
var Html = function (_a) {
    var content = _a.content;
    var _b = useInView(intersectionDefaultOptions), refIntersectionObserver = _b[0], inView = _b[1];
    var htmlContent = useMemo(function () {
        if (content.lazy_load) {
            if (inView) {
                return content.body || '';
            }
            else {
                return '';
            }
        }
        else {
            return content.body || '';
        }
    }, [inView, content.lazy_load]);
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { dangerouslySetInnerHTML: {
                __html: htmlContent
            }, ref: refIntersectionObserver })));
};
export default Html;
