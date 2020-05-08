var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import StoryblokService from '../StoryblokService';
import { CONFIG } from '../config';
import fetch from 'node-fetch';
import { endMeasureTime, startMeasureTime } from './timer';
import { checkCacheFileExists, readCacheFile, writeCacheFile } from './fileCache';
var resolveAllPromises = function (promises) {
    return Promise.all(promises.map(function (p) { return p.catch(function () {
        // const errorObj = {
        //   status: e.response && e.response.status,
        //   url: e.response && e.response.config && e.response.config.url
        // }
        // console.log(errorObj)
        return null;
    }); }));
};
var getSettingsPath = function (_a) {
    var locale = _a.locale;
    var directory = CONFIG.rootDirectory || locale || '';
    return "cdn/stories/" + (directory ? directory + "/" : '') + "settings";
};
var getCategoryParams = function (_a) {
    var locale = _a.locale;
    var params = {
        per_page: 100,
        sort_by: 'content.name:asc',
        filter_query: {
            'component': {
                'in': 'category'
            }
        }
    };
    if (CONFIG.rootDirectory) {
        params.starts_with = CONFIG.rootDirectory + "/";
    }
    else if (locale) {
        params.starts_with = locale + "/";
    }
    return params;
};
var getStaticContainer = function (_a) {
    var locale = _a.locale;
    var params = {
        per_page: 25,
        sort_by: 'content.name:asc',
        filter_query: {
            'component': {
                'in': 'static_container'
            }
        }
    };
    if (CONFIG.rootDirectory) {
        params.starts_with = CONFIG.rootDirectory + "/";
    }
    else if (locale) {
        params.starts_with = locale + "/";
    }
    return params;
};
var getStoriesParams = function (_a) {
    var locale = _a.locale;
    var params = {
        per_page: 100,
        excluding_fields: 'body,right_body,meta_robots,property,meta_description,seo_body',
        sort_by: 'published_at:desc',
        filter_query: {
            'component': {
                'in': 'page'
            }
        }
    };
    if (CONFIG.rootDirectory) {
        params.starts_with = CONFIG.rootDirectory + "/";
    }
    else if (locale) {
        params.starts_with = locale + "/";
    }
    return params;
};
export var initSharedContentFromStoryblok = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, languagesWithoutDefault;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = CONFIG.languages || [], languagesWithoutDefault = _a.slice(1);
                return [4 /*yield*/, Promise.all(__spreadArrays([
                        fetchSharedContentFromStoryblok()
                    ], languagesWithoutDefault.map((function (locale) { return fetchSharedContentFromStoryblok(locale); })))).then(function () { return console.log('fetch shared is finished!! cache should be set up'); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
export var fetchSharedStoryblokContent = function (locale) {
    return Promise.all([
        StoryblokService.get(getSettingsPath({ locale: locale })),
        StoryblokService.getAll('cdn/stories', getCategoryParams({ locale: locale })),
        StoryblokService.getAll('cdn/stories', getStoriesParams({ locale: locale })),
        StoryblokService.getAll('cdn/stories', getStaticContainer({ locale: locale }))
    ]);
};
export var fetchSharedContentFromStoryblok = function (locale) { return __awaiter(void 0, void 0, void 0, function () {
    var cacheName, data, context;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cacheName = "app-content" + (locale ? '-' + locale : '');
                startMeasureTime('start get file cache' + ' ' + cacheName);
                if (!checkCacheFileExists(cacheName)) return [3 /*break*/, 2];
                //file exists
                console.log('read existing cache file', cacheName);
                return [4 /*yield*/, readCacheFile(cacheName)];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                console.log('write cache file', cacheName);
                return [4 /*yield*/, fetchSharedStoryblokContent(locale)];
            case 3:
                context = _a.sent();
                return [4 /*yield*/, writeCacheFile(cacheName, context)];
            case 4:
                _a.sent();
                return [2 /*return*/, context];
            case 5:
                endMeasureTime('finish get file cache');
                return [2 /*return*/];
        }
    });
}); };
var fetchContentBasedOnRequest = function (_a) {
    var ssrHostname = _a.ssrHostname, locale = _a.locale;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!ssrHostname) return [3 /*break*/, 2];
                    console.log('hostname:::SSR', ssrHostname);
                    return [4 /*yield*/, fetch(ssrHostname + '/api/shared-data' + (locale ? '/' + locale : ''))
                            .then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _b.sent()];
                case 2: return [4 /*yield*/, fetchSharedContentFromStoryblok(locale)];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var apiRequestResolver = function (_a) {
    var pageSlug = _a.pageSlug, locale = _a.locale, isLandingPage = _a.isLandingPage, ssrHostname = _a.ssrHostname;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, settings, categories, stories, staticContent, all, _c, languagesWithoutDefault, _d, page, otherPageLanguages, _e, localizedSettings, localizedCategories, localizedStories, localizedStaticContent;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, fetchContentBasedOnRequest({ locale: locale, ssrHostname: ssrHostname })];
                case 1:
                    _b = _f.sent(), settings = _b[0], categories = _b[1], stories = _b[2], staticContent = _b[3];
                    all = [
                        StoryblokService.get("cdn/stories/" + pageSlug)
                    ];
                    if (CONFIG.suppressSlugLocale && CONFIG.languages.length > 1 && !isLandingPage) {
                        _c = CONFIG.languages // make sure default language is always first of array
                        , languagesWithoutDefault = _c.slice(1);
                        if (CONFIG.suppressSlugIncludeDefault) {
                            languagesWithoutDefault.unshift(CONFIG.defaultLocale);
                        }
                        languagesWithoutDefault.forEach(function (locale) {
                            all.push(StoryblokService.get("cdn/stories/" + locale + "/" + pageSlug));
                        });
                    }
                    return [4 /*yield*/, resolveAllPromises(all)];
                case 2:
                    _d = _f.sent(), page = _d[0], otherPageLanguages = _d.slice(1);
                    if (!(page === null && otherPageLanguages.length)) return [3 /*break*/, 4];
                    otherPageLanguages.forEach(function (value, index) {
                        if (value) {
                            locale = CONFIG.languages[CONFIG.suppressSlugIncludeDefault ? index : index + 1]; // overwrite locale
                            page = value; // overwrite page values of localized page
                        }
                    });
                    return [4 /*yield*/, fetchContentBasedOnRequest({
                            locale: locale,
                            ssrHostname: ssrHostname
                        })];
                case 3:
                    _e = _f.sent(), localizedSettings = _e[0], localizedCategories = _e[1], localizedStories = _e[2], localizedStaticContent = _e[3];
                    return [2 /*return*/, {
                            page: page,
                            locale: locale,
                            settings: localizedSettings,
                            allCategories: localizedCategories,
                            allStories: localizedStories,
                            allStaticContent: localizedStaticContent,
                            listWidgetData: {}
                        }];
                case 4: return [2 /*return*/, {
                        page: page,
                        settings: settings,
                        allCategories: categories,
                        allStories: stories,
                        locale: locale,
                        allStaticContent: staticContent,
                        listWidgetData: {}
                    }];
            }
        });
    });
};
