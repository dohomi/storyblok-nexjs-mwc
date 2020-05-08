var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CONFIG } from '../config';
import { prepareForStoryblok } from './prepareStoryblokRequest';
import { apiRequestResolver } from './storyblokDeliveryResolver';
import { collectComponentData } from './traversePageContent';
const getPageProps = (slug, ssrHostname) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { isLandingPage, knownLocale, pageSlug } = prepareForStoryblok(slug);
    let { page, settings, allCategories = [], allStories = [], locale, allStaticContent = [] } = yield apiRequestResolver({
        pageSlug,
        locale: knownLocale,
        isLandingPage: isLandingPage,
        ssrHostname
    });
    if (CONFIG.defaultLocale && !locale) {
        locale = CONFIG.defaultLocale;
    }
    if (CONFIG.overwriteLocale) {
        locale = CONFIG.overwriteLocale;
    }
    // const url = `https://${process.env.HOSTNAME}${seoSlug ? `/${seoSlug}` : ''}` // for seo purpose
    const pageProps = (_b = (_a = page === null || page === void 0 ? void 0 : page.data) === null || _a === void 0 ? void 0 : _a.story) === null || _b === void 0 ? void 0 : _b.content;
    const settingsProps = (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.data) === null || _c === void 0 ? void 0 : _c.story) === null || _d === void 0 ? void 0 : _d.content;
    if (!settings) {
        console.log('SETTINGS MISSNG');
    }
    else if (!pageProps) {
        console.log('PAGE MISSNG');
    }
    let componentData = null;
    if (pageProps) {
        // traverse content and fetch list widget data
        componentData = yield collectComponentData(pageProps, allCategories, allStories, knownLocale);
    }
    return {
        page: pageProps ? Object.assign(Object.assign({}, pageProps), { uuid: (_f = (_e = page === null || page === void 0 ? void 0 : page.data) === null || _e === void 0 ? void 0 : _e.story) === null || _f === void 0 ? void 0 : _f.uuid }) : null,
        settings: settingsProps ? Object.assign(Object.assign({}, settingsProps), { uuid: (_h = (_g = settings === null || settings === void 0 ? void 0 : settings.data) === null || _g === void 0 ? void 0 : _g.story) === null || _h === void 0 ? void 0 : _h.uuid }) : null,
        allCategories,
        allStaticContent,
        locale,
        listWidgetData: componentData || null
    };
});
export default getPageProps;
