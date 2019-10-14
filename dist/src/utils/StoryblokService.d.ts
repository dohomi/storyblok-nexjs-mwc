/// <reference types="react" />
declare class StoryblokService {
    private devMode;
    private token;
    private client;
    private query;
    constructor();
    flushCache(): boolean;
    getCacheVersion(): number;
    get(slug: string, params?: any): Promise<import("storyblok-js-client").StoryblokResult>;
    initEditor(content: any, setContent: Function): void;
    insideVisualComposer(): boolean;
    setQuery(query: any): void;
    getQuery(param: any): any;
    bridge(): JSX.Element | "";
}
declare const storyblokInstance: StoryblokService;
export default storyblokInstance;
