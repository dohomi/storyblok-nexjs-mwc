import { FunctionComponent } from 'react';
import { GlobalStoryblok } from '../../typings/generated/components-schema';
declare type LayoutProps = {
    hasFeature?: boolean;
    settings: GlobalStoryblok;
    asPath?: string;
};
declare const Layout: FunctionComponent<LayoutProps>;
export default Layout;
