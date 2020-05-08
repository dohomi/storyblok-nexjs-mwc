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
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import deviceDetect from '../../utils/deviceDetect';
var defaultValue = {
    height: 500,
    width: 599,
    isMobile: true,
    isTablet: false,
    isDesktop: false
};
export var WindowDimensionsCtx = createContext(defaultValue);
var WindowDimensionsProvider = function (_a) {
    var children = _a.children;
    var defaultValue = __assign({ height: 500, width: 599, isMobile: true, isTablet: false, isDesktop: false }, deviceDetect());
    if (typeof window !== 'undefined') {
        defaultValue = getWindowDimensions();
    }
    var _b = useState(defaultValue), dimensions = _b[0], setDimensions = _b[1];
    var debouncedCallback = useDebouncedCallback(
    // function
    function () {
        setDimensions(getWindowDimensions());
    }, 
    // delay in ms
    500)[0];
    useEffect(function () {
        if (typeof window === 'undefined') {
            return;
        }
        window.addEventListener('resize', debouncedCallback);
        return function () {
            window.removeEventListener('resize', debouncedCallback);
        };
    }, []);
    function getWindowDimensions() {
        var opts = __assign(__assign({}, defaultValue), { height: window.innerHeight, width: window.innerWidth, isTabletWidth: window.innerWidth >= 600 && window.innerWidth < 960 });
        return opts;
    }
    return (React.createElement(WindowDimensionsCtx.Provider, { value: dimensions }, children));
};
export default WindowDimensionsProvider;
export var useWindowDimensions = function () { return useContext(WindowDimensionsCtx); };
