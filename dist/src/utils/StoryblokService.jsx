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
var StoryblokToken = {
    preview: process.env.STORYBLOK_PREVIEW,
    public: process.env.STORYBLOK_PUBLIC
};
var StoryblokService = /** @class */ (function () {
    function StoryblokService() {
        this.devMode = false; // If true it always loads draft
        this.token = process.env.NODE_ENV === 'development' ? StoryblokToken.preview : StoryblokToken.public;
        this.client = new StoryblokClient({
            accessToken: this.token,
            cache: {
                clear: 'auto',
                type: 'memory'
            }
        });
        this.query = {};
    }
    StoryblokService.prototype.flushCache = function () {
        console.log('flush cashed triggered. ENV Vars:', StoryblokToken.preview, StoryblokToken.public);
        console.log('current token:', this.client.getToken());
        this.client.flushCache();
        return true;
    };
    StoryblokService.prototype.getCacheVersion = function () {
        return this.client.cacheVersion;
    };
    StoryblokService.prototype.get = function (slug, params) {
        params = params || {};
        if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
            this.token = StoryblokToken.preview;
            this.client.setToken(StoryblokToken.preview);
            params.version = 'draft';
        }
        if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
            params.cv = window.StoryblokCacheVersion;
        }
        if (this.getQuery('_storyblok_release')) {
            params.from_release = this.getQuery('_storyblok_release');
        }
        return this.client.get(slug, params);
    };
    StoryblokService.prototype.initEditor = function (content, setContent) {
        var _this = this;
        if (window.storyblok) {
            window.storyblok.init({ accessToken: this.token });
            window.storyblok.on(['change'], function () {
                console.log('change::save triggered');
                // location.reload()
            });
            window.storyblok.on(['published', 'unpublished'], function () {
                console.log('published triggered');
                fetch(location.protocol + "//" + location.host + "/api/clear-cache")
                    .then(function () {
                    console.log('flush cashed successful triggered. ENV Vars:', StoryblokToken.preview, StoryblokToken.public);
                    console.log('after flush: current token:', _this.client.getToken());
                    location.reload();
                })
                    .catch(function (e) {
                    console.error('error on flush cache:', e);
                });
            });
            window.storyblok.on('input', function (event) {
                // todo if this is still works after rewrite... maybe add one for settings as well..
                if (event.story.content._uid === content.page._uid) {
                    console.log('input::input changed');
                    setContent(__assign(__assign({}, content), { page: event.story.content }));
                }
            });
        }
    };
    StoryblokService.prototype.insideVisualComposer = function () {
        return !!this.getQuery('_storyblok');
    };
    StoryblokService.prototype.setQuery = function (query) {
        this.query = query;
    };
    StoryblokService.prototype.getQuery = function (param) {
        return this.query[param];
    };
    StoryblokService.prototype.bridge = function () {
        if (!this.getQuery('_storyblok')) {
            return '';
        }
        return (<script src={'//app.storyblok.com/f/storyblok-latest.js?t=' + this.token}></script>);
    };
    return StoryblokService;
}());
var storyblokInstance = new StoryblokService();
export default storyblokInstance;
