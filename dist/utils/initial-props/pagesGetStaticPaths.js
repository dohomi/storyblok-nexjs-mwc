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
import { getStoryblokPagesConfig } from '../../pages/api/sitemap';
import { internalLinkHandler } from '../linkHandler';
import { initSharedContentFromStoryblok } from './storyblokDeliveryResolver';
const pagesGetStaticPaths = () => __awaiter(void 0, void 0, void 0, function* () {
    const stories = yield StoryblokService.getAll('cdn/stories', getStoryblokPagesConfig());
    yield initSharedContentFromStoryblok();
    let paths = stories.map(pageItem => {
        return {
            params: {
                index: internalLinkHandler(pageItem.full_slug).split('/').filter(i => i)
            }
        };
    });
    // todo: different loading mode for root folder and language handling
    // paths = paths.slice(0, 3)
    //
    // console.log(paths[0], paths[1], paths[2])
    return {
        paths,
        fallback: true
    };
});
export default pagesGetStaticPaths;
