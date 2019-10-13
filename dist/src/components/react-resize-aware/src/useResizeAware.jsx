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
import * as React from 'react';
import ResizeListener from './ResizeListener';
//@ts-ignore
var defaultReporter = function (target) { return ({
    width: target != null ? target.offsetWidth : null,
    height: target != null ? target.offsetHeight : null
}); };
export default function useResizeAware(reporter) {
    if (reporter === void 0) { reporter = defaultReporter; }
    var _a = __read(React.useState(
    // @ts-ignore
    reporter(null)), 2), sizes = _a[0], setSizes = _a[1];
    var onResize = React.useCallback(function (ref) { return setSizes(reporter(ref.current)); }, [
        reporter
    ]);
    // @ts-ignore
    var resizeListenerNode = React.useMemo(function () { return <ResizeListener onResize={onResize}/>; }, [onResize]);
    return [resizeListenerNode, sizes];
}
