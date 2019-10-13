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
import React, { createContext, useContext, useEffect, useState } from 'react';
import DeviceDetectService from '../../utils/DeviceDetectService';
import ResizeObserver from 'resize-observer-polyfill';
var defaultValue = {
    height: 0,
    width: 0,
    isMobile: false
};
export var WindowDimensionsCtx = createContext(defaultValue);
var getWindowDimensions = function () {
    var opts = {
        height: window.innerHeight,
        width: window.innerWidth,
        isMobile: DeviceDetectService.getDevice() && DeviceDetectService.getDevice().device === 'mobile'
    };
    return opts;
};
var debounce = function (ms, fn) {
    var timer;
    return function () {
        clearTimeout(timer);
        var args = Array.prototype.slice.call(arguments);
        // @ts-ignore
        args.unshift(this);
        timer = setTimeout(fn.bind.apply(fn, args), ms);
    };
};
var WindowDimensionsProvider = function (_a) {
    var children = _a.children;
    if (typeof window === 'undefined') {
        return (<WindowDimensionsCtx.Provider value={defaultValue}>
        {children}
      </WindowDimensionsCtx.Provider>);
    }
    var _b = __read(useState(getWindowDimensions()), 2), dimensions = _b[0], setDimensions = _b[1];
    useEffect(function () {
        var body = document.querySelector('body');
        var checkWindowsDimensions = function (entries) {
            if (!Array.isArray(entries)) {
                return;
            }
            // Since we only observe the one element, we don't need to loop over the
            // array
            if (!entries.length) {
                return;
            }
            setDimensions(getWindowDimensions());
        };
        var resizeObserver = new ResizeObserver(debounce(500, checkWindowsDimensions));
        resizeObserver.observe(body);
        return function () {
            resizeObserver.unobserve(body);
        };
    }, []);
    return (<WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>);
};
export default WindowDimensionsProvider;
export var useWindowDimensions = function () { return useContext(WindowDimensionsCtx); };
