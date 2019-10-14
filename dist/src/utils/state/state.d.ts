/// <reference types="react" />
/// <reference types="next" />
/// <reference types="@emotion/core" />
declare const GlobalStateProvider: import("react").ComponentType<{}>, setGlobalState: import("react-hooks-global-state").SetGlobalState<{
    leftNavigationDrawer: boolean;
    megaMenu: {};
}>, useGlobalState: import("react-hooks-global-state").UseGlobalState<{
    leftNavigationDrawer: boolean;
    megaMenu: {};
}>;
export { GlobalStateProvider, useGlobalState, setGlobalState };
