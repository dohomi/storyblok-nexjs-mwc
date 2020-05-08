import { createGlobalState } from 'react-hooks-global-state';
import { CONFIG } from '../config';
const initialState = {
    leftNavigationDrawer: false,
    rightNavigationDrawer: false,
    searchParams: {
        searchText: undefined,
        categories: undefined
    },
    locale: CONFIG.defaultLocale,
    hasWebpSupport: undefined
};
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState(initialState);
export { useGlobalState, setGlobalState, getGlobalState };
