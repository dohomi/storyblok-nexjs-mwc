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
import Components from '@components';
var SliderChild = function (_a) {
    var body = _a.body, sectionVariant = _a.sectionVariant;
    return (React.createElement("div", { className: "d-flex h-100 lm-slider__container flex-row justify-content-center" }, body.map(function (item) {
        if (item.component === 'section') {
            var newOpts = __assign(__assign({}, item), { presetVariant: sectionVariant || 'transparent' });
            return Components(newOpts);
        }
        return React.createElement("div", { key: "child_" + item._uid, className: "flex-grow-1" }, Components(item));
    })));
};
export default SliderChild;
