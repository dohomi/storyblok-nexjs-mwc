import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import deviceDetect from '../../utils/deviceDetect';
let defaultValue = {
    height: 500,
    width: 599,
    isMobile: true,
    isTablet: false,
    isDesktop: false
};
export const WindowDimensionsCtx = createContext(defaultValue);
const WindowDimensionsProvider = ({ children }) => {
    let defaultValue = Object.assign({ height: 500, width: 599, isMobile: true, isTablet: false, isDesktop: false }, deviceDetect());
    if (typeof window !== 'undefined') {
        defaultValue = getWindowDimensions();
    }
    const [dimensions, setDimensions] = useState(defaultValue);
    const [debouncedCallback] = useDebouncedCallback(
    // function
    () => {
        setDimensions(getWindowDimensions());
    }, 
    // delay in ms
    500);
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        window.addEventListener('resize', debouncedCallback);
        return () => {
            window.removeEventListener('resize', debouncedCallback);
        };
    }, []);
    function getWindowDimensions() {
        const opts = Object.assign(Object.assign({}, defaultValue), { height: window.innerHeight, width: window.innerWidth, isTabletWidth: window.innerWidth >= 600 && window.innerWidth < 960 });
        return opts;
    }
    return (React.createElement(WindowDimensionsCtx.Provider, { value: dimensions }, children));
};
export default WindowDimensionsProvider;
export const useWindowDimensions = () => useContext(WindowDimensionsCtx);
