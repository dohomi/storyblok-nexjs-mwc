import { FunctionComponent } from 'react';
import { GlobalStoryblok } from '../../../typings/generated/components-schema';
declare type AppTopAppProps = {
    transparentToolbar: boolean;
    toolbarConfig: GlobalStoryblok['toolbar_config'];
    fixed: boolean;
};
declare const TopAppBarBridge: FunctionComponent<AppTopAppProps>;
export default TopAppBarBridge;
