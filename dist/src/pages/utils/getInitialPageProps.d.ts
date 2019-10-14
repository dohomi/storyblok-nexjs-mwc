import { NextPageContext } from 'next';
import { GlobalStoryblok, PageStoryblok, SeoOpenGraphStoryblok } from '../../typings/generated/components-schema';
export declare type PageSeoProps = {
    title: string;
    description: string;
    body: SeoOpenGraphStoryblok[];
    url: string;
    disableRobots: boolean;
};
export declare type AppPageProps = {
    settings: GlobalStoryblok;
    page: PageStoryblok;
    pageSeo?: PageSeoProps;
    error?: any;
    hasFeature?: boolean;
};
declare const getInitialPageProps: (ctx: NextPageContext) => Promise<AppPageProps>;
export default getInitialPageProps;
