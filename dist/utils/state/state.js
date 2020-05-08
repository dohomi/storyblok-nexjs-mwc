import { createGlobalState } from 'react-hooks-global-state';
import { CONFIG } from '../config';
var initialState = {
    leftNavigationDrawer: false,
    rightNavigationDrawer: false,
    searchParams: {
        searchText: undefined,
        categories: undefined
    },
    locale: CONFIG.defaultLocale,
    hasWebpSupport: undefined
};
var _a = createGlobalState(initialState), setGlobalState = _a.setGlobalState, useGlobalState = _a.useGlobalState, getGlobalState = _a.getGlobalState;
export { useGlobalState, setGlobalState, getGlobalState };
