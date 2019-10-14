export declare type LinkPropsType = {
    to?: string;
    href?: string;
    rel?: string;
    target?: string;
};
export interface LinkType {
    cached_url: string;
    linktype: string;
    [k: string]: any;
}
interface LinkOptions {
    openExternal?: boolean;
}
export declare const linkHandler: (props: LinkPropsType, link: LinkType, options: LinkOptions) => void;
export {};
