import React, { createContext, useContext } from 'react';
var defaultValue = {
    allCategories: [],
    allStaticContent: [],
    listWidgetData: {}
};
var AppContext = createContext(defaultValue);
var AppProvider = function (_a) {
    var children = _a.children, content = _a.content;
    return React.createElement(AppContext.Provider, { value: content }, children);
};
export var useAppContext = function () { return useContext(AppContext); };
export default AppProvider;
