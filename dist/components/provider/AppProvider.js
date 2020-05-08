import React, { createContext, useContext } from 'react';
const defaultValue = {
    allCategories: [],
    allStaticContent: [],
    listWidgetData: {}
};
const AppContext = createContext(defaultValue);
const AppProvider = ({ children, content }) => {
    return React.createElement(AppContext.Provider, { value: content }, children);
};
export const useAppContext = () => useContext(AppContext);
export default AppProvider;
