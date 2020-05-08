var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { createRef } from 'react';
var ImageShadow = function (_a) {
    var afterLoad = _a.afterLoad, rest = __rest(_a, ["afterLoad"]);
    var ref = createRef();
    if (!rest.src) {
        return null; // don't render any component
    }
    var hasLoaded = function () {
        var _a, _b;
        var src = ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.currentSrc) || ((_b = ref.current) === null || _b === void 0 ? void 0 : _b.src) || '';
        src && typeof afterLoad === 'function' && afterLoad(src);
    };
    return React.createElement("img", __assign({ ref: ref, style: { display: 'none' }, alt: 'img shadow' }, rest, { onLoad: hasLoaded }));
};
export default ImageShadow;
