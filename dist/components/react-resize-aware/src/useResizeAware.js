import * as React from 'react';
import ResizeListener from './ResizeListener';
//@ts-ignore
var defaultReporter = function (target) { return ({
    width: target != null ? target.offsetWidth : null,
    height: target != null ? target.offsetHeight : null
}); };
export default function useResizeAware(reporter) {
    if (reporter === void 0) { reporter = defaultReporter; }
    var _a = React.useState(
    // @ts-ignore
    reporter(null)), sizes = _a[0], setSizes = _a[1];
    var onResize = React.useCallback(function (ref) { return setSizes(reporter(ref.current)); }, [
        reporter
    ]);
    // @ts-ignore
    var resizeListenerNode = React.useMemo(function () { return React.createElement(ResizeListener, { onResize: onResize }); }, [onResize]);
    return [resizeListenerNode, sizes];
}
