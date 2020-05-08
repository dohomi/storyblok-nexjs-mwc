import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useWindowDimensions } from './WindowDimensionsProvider';
const defaultValue = {
    hasDrawer: false,
    hasFeatureImage: false,
    hasRightDrawer: false,
    drawerVariant: 'temporary',
    drawerBelowToolbar: false,
    hasScrollCollapse: false
};
const AppSetupContext = createContext(defaultValue);
const AppSetupProvider = ({ children, settings, page }) => {
    var _a;
    const { isMobile } = useWindowDimensions();
    const hasDrawer = Array.isArray(settings.drawer_body) && settings.drawer_body.length > 0;
    const hasFeatureImage = page && Array.isArray(page.property) && page.property.includes('has_feature');
    const hasRightDrawer = page && Array.isArray(page.right_body) && ((_a = page.right_body) === null || _a === void 0 ? void 0 : _a.length) > 0;
    const hasScrollCollapse = !!(settings.toolbar_config && settings.toolbar_config.includes('scroll_collapse'));
    let drawerVariant = isMobile && settings.drawer_below_toolbar_xs ? 'persistent' : 'temporary';
    if (!isMobile) {
        drawerVariant = settings.drawer_below_toolbar ? 'persistent' : settings.drawer_variant || 'temporary';
    }
    const toolbarMainHeight = settings.toolbar_main_height;
    const drawerBelowToolbar = settings.drawer_below_toolbar_xs || settings.drawer_below_toolbar;
    const drawerFullWidthMobile = !!settings.drawer_full_width_mobile;
    const rightDrawerMediaBreakpoint = page === null || page === void 0 ? void 0 : page.mobile_breakpoint;
    const leftDrawerMediaBreakpoint = settings === null || settings === void 0 ? void 0 : settings.mobile_nav_breakpoint;
    const value = useMemo(() => {
        return {
            hasDrawer,
            hasFeatureImage,
            hasRightDrawer,
            hasScrollCollapse,
            toolbarMainHeight,
            drawerVariant,
            drawerBelowToolbar,
            drawerFullWidthMobile,
            rightDrawerMediaBreakpoint,
            leftDrawerMediaBreakpoint
        };
    }, [hasDrawer, hasFeatureImage, hasRightDrawer, hasScrollCollapse, toolbarMainHeight, drawerVariant, drawerBelowToolbar, drawerFullWidthMobile, rightDrawerMediaBreakpoint, leftDrawerMediaBreakpoint]);
    return (React.createElement(AppSetupContext.Provider, { value: value }, children));
};
export const useAppSetup = () => useContext(AppSetupContext);
export default AppSetupProvider;
