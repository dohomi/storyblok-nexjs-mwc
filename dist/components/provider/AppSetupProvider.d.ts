import { FunctionComponent } from 'react';
import { DrawerProps } from '@material-ui/core';
import { GlobalStoryblok, PageStoryblok } from '../../typings/generated/components-schema';
export declare type AppSetupProps = {
    hasDrawer?: boolean;
    hasFeatureImage?: boolean;
    hasRightDrawer?: boolean;
    drawerVariant?: DrawerProps['variant'];
    drawerBelowToolbar?: boolean;
    hasScrollCollapse?: boolean;
    toolbarMainHeight?: string | number;
    drawerFullWidthMobile?: boolean;
    rightDrawerMediaBreakpoint?: PageStoryblok['mobile_breakpoint'];
    leftDrawerMediaBreakpoint?: GlobalStoryblok['mobile_nav_breakpoint'];
};
declare const AppSetupProvider: FunctionComponent<{
    settings: GlobalStoryblok;
    page?: PageStoryblok;
}>;
export declare const useAppSetup: () => AppSetupProps;
export default AppSetupProvider;
