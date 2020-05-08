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
import { default as React } from 'react';
import Headline from './Headline';
var DateHeadline = function (_a) {
    var content = _a.content;
    var _b, _c;
    var modifContent = __assign(__assign({}, content), { text: (_b = content.text) === null || _b === void 0 ? void 0 : _b.replace('{date}', "" + new Date().getFullYear()), text_xs: (_c = content.text_xs) === null || _c === void 0 ? void 0 : _c.replace('{date}', "" + new Date().getFullYear()) });
    return (React.createElement(Headline, { content: modifContent }));
};
export default DateHeadline;
