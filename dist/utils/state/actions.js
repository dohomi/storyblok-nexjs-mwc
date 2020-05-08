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
export var toggleRightNavigation = function () {
    setGlobalState('rightNavigationDrawer', function (value) { return !value; });
};
export var closeNavigationDrawers = function () {
    setGlobalState('leftNavigationDrawer', false);
    setGlobalState('rightNavigationDrawer', false);
};
// export const setAppSetup = (options: State['appSetup']) => {
//   setGlobalState('appSetup', options)
// }
var addSearchParamsToUrl = function (_a) {
    var categories = _a.categories, searchText = _a.searchText;
    var currentUrl = new URL(window.location.href);
    if (categories) {
        currentUrl.searchParams.delete('search__categories');
        categories.forEach(function (category) {
            currentUrl.searchParams.append('search__categories', category);
        });
    }
    if (searchText !== undefined) {
        if (!searchText) {
            currentUrl.searchParams.delete('search__text');
        }
        else {
            currentUrl.searchParams.set('search__text', searchText);
        }
    }
    window.history.pushState({ path: currentUrl.href }, '', currentUrl.href);
    window.scrollTo(0, 0);
};
export var onSearchTextChange = function (searchText) {
    setGlobalState('searchParams', function (v) { return (__assign(__assign({}, v), { searchText: searchText })); });
    addSearchParamsToUrl({ searchText: searchText });
};
export var setSearchCategory = function (categories) {
    setGlobalState('searchParams', function (v) { return (__assign(__assign({}, v), { categories: categories })); });
    addSearchParamsToUrl({ categories: categories });
};
