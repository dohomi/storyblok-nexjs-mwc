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
import StoryblokService from '../../utils/StoryblokService';
import { SitemapStream, streamToPromise } from 'sitemap';
import { CONFIG } from '../../utils/config';
import { internalLinkHandler } from '../../utils/linkHandler';
export function getStoryblokPagesConfig() {
    var params = {
        per_page: 100,
        excluding_fields: 'body,right_body,meta_robots,property,meta_title,meta_description,seo_body,preview_title,preview_subtitle,preview_image,preview_teaser',
        sort_by: 'published_at:desc',
        filter_query: {
            component: {
                in: 'page'
            },
            meta_robots: {
                not_in: true
            }
        }
    };
    if (CONFIG.rootDirectory) {
        params.starts_with = CONFIG.rootDirectory + "/";
    }
    return params;
}
export default function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stories, smStream, ignoreList, _loop_1, _i, stories_1, story, sitemap, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, StoryblokService.getAll('cdn/stories', getStoryblokPagesConfig())];
                case 1:
                    stories = _a.sent();
                    smStream = new SitemapStream({ hostname: 'https://' + req.headers.host });
                    ignoreList = (process.env.sitemapIgnorePath && process.env.sitemapIgnorePath.split(',')) || [];
                    ignoreList.push('demo-content');
                    _loop_1 = function (story) {
                        var fullSlug = story.full_slug;
                        var shouldIndex = !ignoreList.some(function (ignorePath) { return fullSlug.includes(ignorePath); });
                        if (shouldIndex) {
                            var isHome = story.slug === 'home';
                            if (isHome) {
                                smStream.write({
                                    url: fullSlug.replace('home', ''),
                                    lastmod: story.published_at,
                                    priority: 1.0
                                });
                            }
                            else {
                                smStream.write({
                                    url: internalLinkHandler(fullSlug),
                                    lastmod: story.published_at,
                                    priority: 0.5
                                });
                            }
                        }
                    };
                    for (_i = 0, stories_1 = stories; _i < stories_1.length; _i++) {
                        story = stories_1[_i];
                        _loop_1(story);
                    }
                    smStream.end();
                    return [4 /*yield*/, streamToPromise(smStream)
                            .then(function (sm) { return sm.toString(); })];
                case 2:
                    sitemap = _a.sent();
                    res.setHeader('Content-Type', 'text/xml');
                    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
                    res.write(sitemap);
                    res.end();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    res.statusCode = 500;
                    res.end();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
