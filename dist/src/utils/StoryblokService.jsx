"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storyblok_js_client_1 = __importDefault(require("storyblok-js-client"));
const StoryblokToken = {
    preview: process.env.STORYBLOK_PREVIEW,
    public: process.env.STORYBLOK_PUBLIC
};
class StoryblokService {
    constructor() {
        this.devMode = false; // If true it always loads draft
        this.token = process.env.NODE_ENV === 'development' ? StoryblokToken.preview : StoryblokToken.public;
        this.client = new storyblok_js_client_1.default({
            accessToken: this.token,
            cache: {
                clear: 'auto',
                type: 'memory'
            }
        });
        this.query = {};
    }
    setToken(token) {
        this.token = token;
        this.client.setToken(token);
    }
    flushCache() {
        console.log('flush cashed triggered. ENV Vars:', StoryblokToken.preview, StoryblokToken.public);
        console.log('current token:', this.client.getToken());
        this.client.flushCache();
        return true;
    }
    getCacheVersion() {
        return this.client.cacheVersion;
    }
    getToken() {
        return this.client.getToken();
    }
    getSearch(slug, params) {
        this.client.setToken(StoryblokToken.public);
        return this.client.get(slug, Object.assign(Object.assign({}, params), this.getDefaultParams()));
    }
    getDefaultParams() {
        const params = {};
        if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
            this.token = StoryblokToken.preview;
            this.client.setToken(StoryblokToken.preview);
            params.version = 'draft';
        }
        if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
            params.cv = window.StoryblokCacheVersion;
        }
        if (this.getQuery('_storyblok_release')) {
            // @ts-ignore
            params.from_release = this.getQuery('_storyblok_release');
        }
        return params;
    }
    getAll(slug, params = {}) {
        return this.client.getAll(slug, Object.assign(Object.assign({}, params), this.getDefaultParams()), 'stories');
    }
    get(slug, params = {}) {
        params = params || {};
        return this.client.get(slug, Object.assign(Object.assign({}, params), this.getDefaultParams()));
    }
    initEditor(content, setContent) {
        if (window.storyblok) {
            window.storyblok.init({ accessToken: this.token });
            window.storyblok.on(['change'], () => {
                console.log('change::save triggered');
                // location.reload()
            });
            window.storyblok.on(['published', 'unpublished'], () => {
                console.log('published triggered');
                fetch(`${location.protocol}//${location.host}/api/clear-cache`)
                    .then(() => {
                    console.log('flush cashed successful triggered. ENV Vars:', StoryblokToken.preview, StoryblokToken.public);
                    console.log('after flush: current token:', this.client.getToken());
                    location.reload();
                })
                    .catch((e) => {
                    console.error('error on flush cache:', e);
                });
            });
            window.storyblok.on('input', (event) => {
                // todo if this is still works after rewrite... maybe add one for settings as well..
                if (event.story.content._uid === content.page._uid) {
                    console.log('input::input changed');
                    setContent(Object.assign(Object.assign({}, content), { page: event.story.content }));
                }
            });
        }
    }
    insideVisualComposer() {
        return !!this.getQuery('_storyblok');
    }
    setQuery(query) {
        this.query = query;
    }
    getQuery(param) {
        return this.query[param];
    }
}
const storyblokInstance = new StoryblokService();
exports.default = storyblokInstance;
