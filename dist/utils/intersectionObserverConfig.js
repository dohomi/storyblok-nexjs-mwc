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
export var intersectionDefaultOptions = {
    triggerOnce: true,
    rootMargin: '400px 0px 400px 0px'
};
export var intersectionIframeOptions = __assign(__assign({}, intersectionDefaultOptions), { rootMargin: '150px 0px 150px 0px' });
