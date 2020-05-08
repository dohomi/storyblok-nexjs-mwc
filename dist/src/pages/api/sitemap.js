var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StoryblokService from '../../utils/StoryblokService';
import { SitemapStream, streamToPromise } from 'sitemap';
import { CONFIG } from '../../utils/config';
import { internalLinkHandler } from '../../utils/linkHandler';
export function getStoryblokPagesConfig() {
    const params = {
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
        params.starts_with = `${CONFIG.rootDirectory}/`;
    }
    return params;
}
export default function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // res.setHeader('Content-Encoding', 'gzip')
        try {
            const stories = yield StoryblokService.getAll('cdn/stories', getStoryblokPagesConfig());
            const smStream = new SitemapStream({ hostname: 'https://' + req.headers.host });
            const ignoreList = (process.env.sitemapIgnorePath && process.env.sitemapIgnorePath.split(',')) || [];
            ignoreList.push('demo-content');
            for (const story of stories) {
                const fullSlug = story.full_slug;
                const shouldIndex = !ignoreList.some((ignorePath) => fullSlug.includes(ignorePath));
                if (shouldIndex) {
                    const isHome = story.slug === 'home';
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
            }
            smStream.end();
            const sitemap = yield streamToPromise(smStream)
                .then(sm => sm.toString());
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
            res.write(sitemap);
            res.end();
        }
        catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.end();
        }
    });
}
