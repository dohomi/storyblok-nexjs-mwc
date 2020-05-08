var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import StoryblokClient from 'storyblok-js-client';
import { CONFIG } from './config';
var cv = new Date().getTime();
var StoryblokServiceClass = /** @class */ (function () {
    function StoryblokServiceClass() {
        this.devMode = false; // If true it always loads draft
        this.token = process.env.NODE_ENV === 'development' ? CONFIG.previewToken : CONFIG.publicToken;
        this.previewToken = CONFIG.previewToken;
        this.client = new StoryblokClient({
            accessToken: this.token,
            cache: {
                clear: 'auto',
                type: 'memory'
            }
        });
        this.query = {};
    }
    StoryblokServiceClass.prototype.setToken = function (token) {
        this.token = token;
        this.client.setToken(token);
    };
    StoryblokServiceClass.prototype.flushCache = function () {
        console.log('flush cashed triggered. ENV Vars:', this.previewToken, this.token);
        console.log('current token:', this.client.getToken());
        cv = new Date().getTime();
        this.client.flushCache();
        return true;
    };
    StoryblokServiceClass.prototype.getCacheVersion = function () {
        return this.client.cacheVersion;
    };
    StoryblokServiceClass.prototype.getToken = function () {
        return this.client.getToken();
    };
    StoryblokServiceClass.prototype.getSearch = function (slug, params) {
        return this.client.get(slug, __assign(__assign({}, params), this.getDefaultParams()));
    };
    StoryblokServiceClass.prototype.getDefaultParams = function () {
        var params = {};
        if (!this.devMode) {
            params.cv = cv;
        }
        if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
            this.token = this.previewToken;
            this.client.setToken(this.previewToken);
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
    };
    StoryblokServiceClass.prototype.getAll = function (slug, params) {
        if (params === void 0) { params = {}; }
        return this.client.getAll(slug, __assign(__assign({}, params), this.getDefaultParams()), 'stories');
    };
    StoryblokServiceClass.prototype.get = function (slug, params) {
        if (params === void 0) { params = {}; }
        params = params || {};
        return this.client.get(slug, __assign(__assign({}, params), this.getDefaultParams()));
    };
    StoryblokServiceClass.prototype.setDevMode = function () {
        this.devMode = true;
    };
    StoryblokServiceClass.prototype.initEditor = function (_a) {
        var _this = this;
        var page = _a.page, setPage = _a.setPage, settings = _a.settings, setSettings = _a.setSettings;
        if (window.storyblok) {
            window.storyblok.init({ accessToken: this.token });
            window.storyblok.on(['change'], function () {
                console.log('change::save triggered');
                location.reload();
            });
            window.storyblok.on(['published', 'unpublished'], function () {
                console.log('published triggered');
                fetch(location.protocol + "//" + location.host + "/api/clear-cache")
                    .then(function () {
                    console.log('flush cashed successful triggered. ENV Vars:', _this.previewToken, _this.token);
                    console.log('after flush: current token:', _this.client.getToken());
                    location.reload();
                })
                    .catch(function (e) {
                    console.error('error on flush cache:', e);
                });
            });
            window.storyblok.on('input', function (event) {
                // console.log( content, event.story.content)
                // todo if this is still works after rewrite... maybe add one for settings as well..
                var newContent = __assign(__assign({}, event.story.content), { uuid: event.story.uuid });
                if (event.story.content.component === 'page' && event.story.uuid === (page === null || page === void 0 ? void 0 : page.uuid)) {
                    console.log('input::input content changed');
                    // @ts-ignore
                    setPage(window.storyblok.addComments(newContent, event.story.id));
                }
                if (event.story.content.component === 'global' && event.story.uuid === (settings === null || settings === void 0 ? void 0 : settings.uuid)) {
                    console.log('input::input settings changed');
                    // @ts-ignore
                    setSettings(window.storyblok.addComments(newContent, event.story.id));
                }
                // if (event.story.content.component === 'static_container') {
                //   const newContainerContent = content.allStaticContent.filter((el:any) => el._uid !== event.story.content._uid)
                //   newContainerContent.push(event.story.content)
                //   console.log('input::input static container changed',newContainerContent)
                //   setContent({
                //     ...content,
                //     allStaticContent: newContainerContent
                //   })
                // }
            });
        }
    };
    StoryblokServiceClass.prototype.insideVisualComposer = function () {
        return !!this.getQuery('_storyblok');
    };
    StoryblokServiceClass.prototype.setQuery = function (query) {
        this.query = query;
    };
    StoryblokServiceClass.prototype.getQuery = function (param) {
        return this.query[param];
    };
    return StoryblokServiceClass;
}());
var StoryblokService = new StoryblokServiceClass();
export default StoryblokService;
