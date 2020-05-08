import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useWindowDimensions } from './WindowDimensionsProvider';
var defaultValue = {
    hasDrawer: false,
    hasFeatureImage: false,
    hasRightDrawer: false,
    drawerVariant: 'temporary',
    drawerBelowToolbar: false,
    hasScrollCollapse: false
};
var AppSetupContext = createContext(defaultValue);
var AppSetupProvider = function (_a) {
    var children = _a.children, settings = _a.settings, page = _a.page;
    var _b;
    var isMobile = useWindowDimensions().isMobile;
    var hasDrawer = Array.isArray(settings.drawer_body) && settings.drawer_body.length > 0;
    var hasFeatureImage = page && Array.isArray(page.property) && page.property.includes('has_feature');
    var hasRightDrawer = page && Array.isArray(page.right_body) && ((_b = page.right_body) === null || _b === void 0 ? void 0 : _b.length) > 0;
    var hasScrollCollapse = !!(settings.toolbar_config && settings.toolbar_config.includes('scroll_collapse'));
    var drawerVariant = isMobile && settings.drawer_below_toolbar_xs ? 'persistent' : 'temporary';
    if (!isMobile) {
        drawerVariant = settings.drawer_below_toolbar ? 'persistent' : settings.drawer_variant || 'temporary';
    }
    var toolbarMainHeight = settings.toolbar_main_height;
    var drawerBelowToolbar = settings.drawer_below_toolbar_xs || settings.drawer_below_toolbar;
    var drawerFullWidthMobile = !!settings.drawer_full_width_mobile;
    var rightDrawerMediaBreakpoint = page === null || page === void 0 ? void 0 : page.mobile_breakpoint;
    var leftDrawerMediaBreakpoint = settings === null || settings === void 0 ? void 0 : settings.mobile_nav_breakpoint;
    var value = useMemo(function () {
        return {
            hasDrawer: hasDrawer,
            hasFeatureImage: hasFeatureImage,
            hasRightDrawer: hasRightDrawer,
            hasScrollCollapse: hasScrollCollapse,
            toolbarMainHeight: toolbarMainHeight,
            drawerVariant: drawerVariant,
            drawerBelowToolbar: drawerBelowToolbar,
            drawerFullWidthMobile: drawerFullWidthMobile,
            rightDrawerMediaBreakpoint: rightDrawerMediaBreakpoint,
            leftDrawerMediaBreakpoint: leftDrawerMediaBreakpoint
        };
    }, [hasDrawer, hasFeatureImage, hasRightDrawer, hasScrollCollapse, toolbarMainHeight, drawerVariant, drawerBelowToolbar, drawerFullWidthMobile, rightDrawerMediaBreakpoint, leftDrawerMediaBreakpoint]);
    return (React.createElement(AppSetupContext.Provider, { value: value }, children));
};
export var useAppSetup = function () { return useContext(AppSetupContext); };
export default AppSetupProvider;
