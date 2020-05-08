import { AppPageProps } from '../../typings/app';
export declare const useStoryblok: (props: Pick<AppPageProps, "page" | "settings">) => {
    statePage: import("../../typings/generated/components-schema").PageStoryblok | null | undefined;
    stateSettings: import("../../typings/generated/components-schema").GlobalStoryblok | null | undefined;
};
