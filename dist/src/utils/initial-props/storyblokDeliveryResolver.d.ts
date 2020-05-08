import { AppApiRequestPayload } from '../../typings/app';
declare type ApiProps = {
    pageSlug: string;
    locale?: string;
    isLandingPage?: boolean;
    ssrHostname?: string;
};
export declare const initSharedContentFromStoryblok: () => Promise<void>;
export declare const fetchSharedStoryblokContent: (locale?: string | undefined) => Promise<[import("storyblok-js-client").StoryblokResult, any[], any[], any[]]>;
export declare const fetchSharedContentFromStoryblok: any | void;
export declare const apiRequestResolver: ({ pageSlug, locale, isLandingPage, ssrHostname }: ApiProps) => Promise<AppApiRequestPayload>;
export {};
