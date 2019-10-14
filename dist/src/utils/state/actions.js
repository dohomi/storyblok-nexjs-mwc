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
import { setGlobalState } from './state';
export var toggleLeftNavigation = function () {
    setGlobalState('leftNavigationDrawer', function (value) { return !value; });
};
export var closeNavigationDrawers = function () {
    setGlobalState('leftNavigationDrawer', false);
};
// todo this is used somewhere else.. or not in use any longer?
export var setMegaMenu = function (v, shouldClose) {
    var _a;
    if (shouldClose) {
        setGlobalState('megaMenu', (_a = {}, _a[v] = false, _a)); // close
    }
    else {
        setGlobalState('megaMenu', function (value) {
            var _a;
            var obj = __assign(__assign({}, value), (_a = {}, _a[v] = !value[v], _a));
            console.log(obj);
            return obj;
        }); // toggle
    }
};
