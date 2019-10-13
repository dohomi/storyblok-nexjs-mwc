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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import StoryblokService from '../../utils/StoryblokService';
import DeviceDetectService from '../../utils/DeviceDetectService';
import handleErrorContent from '../../utils/handleErrorContent';
var getInitialPageProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var query, req, res, asPath, pathname, slug, notFoundVars, _a, page, settings, currentSlug, host_1, url, pageProps, settingsProps, overwriteDisableRobots, pageSeo, pageProperties, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                query = ctx.query, req = ctx.req, res = ctx.res, asPath = ctx.asPath, pathname = ctx.pathname;
                slug = query.slug || 'home';
                console.log(slug, query, asPath, pathname);
                if (slug.match(/^.*\.[^\\]+$/)) {
                    notFoundVars = {
                        error: undefined,
                        hasFeature: false,
                        page: { _uid: '', component: 'page' },
                        pageSeo: undefined,
                        settings: { _uid: '', component: 'global', theme_base: 'base' }
                    };
                    console.log('not found', notFoundVars);
                    return [2 /*return*/, notFoundVars];
                }
                DeviceDetectService.setAppServices(req); // important to call first, webp is depending on this
                StoryblokService.setQuery(query);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 5]);
                return [4 /*yield*/, Promise.all([
                        StoryblokService.get("cdn/stories/" + slug),
                        StoryblokService.get("cdn/stories/settings")
                    ])];
            case 2:
                _a = __read.apply(void 0, [_b.sent(), 2]), page = _a[0], settings = _a[1];
                currentSlug = slug !== 'home' ? slug : '' // need to modify. maybe check if ROOT of storyblok config?
                ;
                host_1 = req ? req.headers.host : window.location.host;
                url = "https://" + host_1 + "/" + currentSlug // for seo purpose
                ;
                pageProps = page.data && page.data.story && page.data.story.content;
                settingsProps = settings.data && settings.data.story && settings.data.story.content;
                overwriteDisableRobots = ['dev.', 'test.', 'preview.', 'prev.', 'beta.', 'localhost:'].some(function (i) { return host_1.startsWith(i); }) || host_1.endsWith('.now.sh');
                DeviceDetectService.setLanguage(settingsProps.setup_language, settingsProps.setup_supported_languages, res);
                pageSeo = {
                    title: pageProps.meta_title,
                    description: pageProps.meta_description,
                    disableRobots: overwriteDisableRobots || !!pageProps.meta_robots,
                    body: pageProps.seo_body || [],
                    url: url
                };
                pageProperties = pageProps.property || [];
                return [2 /*return*/, {
                        page: pageProps,
                        settings: settingsProps,
                        pageSeo: pageSeo,
                        hasFeature: pageProperties.includes('has_feature')
                    }];
            case 3:
                e_1 = _b.sent();
                return [4 /*yield*/, handleErrorContent(e_1, res)];
            case 4: return [2 /*return*/, _b.sent()];
            case 5: return [2 /*return*/];
        }
    });
}); };
export default getInitialPageProps;
