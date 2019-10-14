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
import React from 'react';
import MwcComponents from '../src/components/all_components';
// merge all potential components of storyblok. setup components alias in Webpack
var Components = __assign({}, MwcComponents);
export default (function (blok) {
    if (typeof Components[blok.component] !== 'undefined') {
        return React.createElement(Components[blok.component], { key: blok._uid, content: blok });
    }
    return React.createElement(function () { return (<div style={{ color: 'red' }}>The component {blok.component} has not been created yet.</div>); }, { key: blok._uid });
});
