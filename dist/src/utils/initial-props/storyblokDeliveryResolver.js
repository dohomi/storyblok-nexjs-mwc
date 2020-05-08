var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StoryblokService from '../StoryblokService';
import { CONFIG } from '../config';
import fetch from 'node-fetch';
import { endMeasureTime, startMeasureTime } from './timer';
import { checkCacheFileExists, readCacheFile, writeCacheFile } from './fileCache';
const resolveAllPromises = (promises) => {
    return Promise.all(promises.map(p => p.catch(() => {
        // const errorObj = {
        //   status: e.response && e.response.status,
        //   url: e.response && e.response.config && e.response.config.url
        // }
        // console.log(errorObj)
        return null;
    })));
};
const getSettingsPath = ({ locale }) => {
    const directory = CONFIG.rootDirectory || locale || '';
    return `cdn/stories/${directory ? `${directory}/` : ''}settings`;
};
const getCategoryParams = ({ locale }) => {
    const params = {
        per_page: 100,
        sort_by: 'content.name:asc',
        filter_query: {
            'component': {
                'in': 'category'
            }
        }
    };
    if (CONFIG.rootDirectory) {
        params.starts_with = `${CONFIG.rootDirectory}/`;
    }
    else if (locale) {
        params.starts_with = `${locale}/`;
    }
    return params;
};
const getStaticContainer = ({ locale }) => {
    const params = {
        per_page: 25,
        sort_by: 'content.name:asc',
        filter_query: {
            'component': {
                'in': 'static_container'
            }
        }
    };
    if (CONFIG.rootDirectory) {
        params.starts_with = `${CONFIG.rootDirectory}/`;
    }
    else if (locale) {
        params.starts_with = `${locale}/`;
    }
    return params;
};
const getStoriesParams = ({ locale }) => {
    const params = {
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
        params.starts_with = `${CONFIG.rootDirectory}/`;
    }
    else if (locale) {
        params.starts_with = `${locale}/`;
    }
    return params;
};
export const initSharedContentFromStoryblok = () => __awaiter(void 0, void 0, void 0, function* () {
    let [, ...languagesWithoutDefault] = CONFIG.languages || [];
    yield Promise.all([
        fetchSharedContentFromStoryblok(),
        ...languagesWithoutDefault.map((locale => fetchSharedContentFromStoryblok(locale)))
    ]).then(() => console.log('fetch shared is finished!! cache should be set up'));
});
export const fetchSharedStoryblokContent = (locale) => {
    return Promise.all([
        StoryblokService.get(getSettingsPath({ locale })),
        StoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
        StoryblokService.getAll('cdn/stories', getStoriesParams({ locale })),
        StoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
    ]);
};
export const fetchSharedContentFromStoryblok = (locale) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheName = `app-content${locale ? '-' + locale : ''}`;
    startMeasureTime('start get file cache' + ' ' + cacheName);
    if (checkCacheFileExists(cacheName)) {
        //file exists
        console.log('read existing cache file', cacheName);
        const data = yield readCacheFile(cacheName);
        return data;
    }
    else {
        console.log('write cache file', cacheName);
        const context = yield fetchSharedStoryblokContent(locale);
        yield writeCacheFile(cacheName, context);
        return context;
    }
    endMeasureTime('finish get file cache');
});
const fetchContentBasedOnRequest = ({ ssrHostname, locale }) => __awaiter(void 0, void 0, void 0, function* () {
    if (ssrHostname) {
        console.log('hostname:::SSR', ssrHostname);
        return yield fetch(ssrHostname + '/api/shared-data' + (locale ? '/' + locale : ''))
            .then((res) => res.json());
    }
    else {
        return yield fetchSharedContentFromStoryblok(locale);
    }
});
export const apiRequestResolver = ({ pageSlug, locale, isLandingPage, ssrHostname }) => __awaiter(void 0, void 0, void 0, function* () {
    const [settings, categories, stories, staticContent] = yield fetchContentBasedOnRequest({ locale, ssrHostname });
    const all = [
        StoryblokService.get(`cdn/stories/${pageSlug}`)
    ];
    if (CONFIG.suppressSlugLocale && CONFIG.languages.length > 1 && !isLandingPage) {
        let [, ...languagesWithoutDefault] = CONFIG.languages; // make sure default language is always first of array
        if (CONFIG.suppressSlugIncludeDefault) {
            languagesWithoutDefault.unshift(CONFIG.defaultLocale);
        }
        languagesWithoutDefault.forEach((locale) => {
            all.push(StoryblokService.get(`cdn/stories/${locale}/${pageSlug}`));
        });
    }
    let [page, ...otherPageLanguages] = yield resolveAllPromises(all);
    if (page === null && otherPageLanguages.length) {
        otherPageLanguages.forEach((value, index) => {
            if (value) {
                locale = CONFIG.languages[CONFIG.suppressSlugIncludeDefault ? index : index + 1]; // overwrite locale
                page = value; // overwrite page values of localized page
            }
        });
        // make 2nd API calls to fetch locale based settings and other values
        let [localizedSettings, localizedCategories, localizedStories, localizedStaticContent] = yield fetchContentBasedOnRequest({
            locale,
            ssrHostname
        });
        return {
            page,
            locale,
            settings: localizedSettings,
            allCategories: localizedCategories,
            allStories: localizedStories,
            allStaticContent: localizedStaticContent,
            listWidgetData: {}
        };
    }
    return {
        page,
        settings,
        allCategories: categories,
        allStories: stories,
        locale,
        allStaticContent: staticContent,
        listWidgetData: {}
    };
});
