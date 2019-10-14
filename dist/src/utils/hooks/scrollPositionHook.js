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
var _a = require('react'), useState = _a.useState, useEffect = _a.useEffect;
var supportsPassive = false;
var noop = function () {
};
var checkPassiveEventListener = function () {
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', noop, opts);
        window.removeEventListener('testPassive', noop, opts);
    }
    catch (e) {
    }
};
export default function useWindowScrollPosition() {
    if (typeof window === 'undefined') {
        return 0;
    }
    checkPassiveEventListener();
    var getPosition = function () { return window.pageYOffset; };
    //   ({
    //   x: window.pageXOffset,
    //   y: window.pageYOffset
    // })
    var _a = __read(useState(getPosition()), 2), position = _a[0], setPosition = _a[1];
    useEffect(function () {
        var isPainting = false;
        var handleScroll = function () {
            if (isPainting) {
                return;
            }
            isPainting = true;
            window.requestAnimationFrame(function () {
                setPosition(getPosition());
                isPainting = false;
            });
        };
        window.addEventListener('scroll', handleScroll, supportsPassive ? { passive: true } : false);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return position;
}
