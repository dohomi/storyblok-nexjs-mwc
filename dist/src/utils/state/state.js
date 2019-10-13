import { createGlobalState } from 'react-hooks-global-state';
var initialState = {
    leftNavigationDrawer: false,
    megaMenu: {}
};
var _a = createGlobalState(initialState), GlobalStateProvider = _a.GlobalStateProvider, setGlobalState = _a.setGlobalState, useGlobalState = _a.useGlobalState;
export { GlobalStateProvider, useGlobalState, setGlobalState };
