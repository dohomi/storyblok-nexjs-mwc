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
import { endMeasureTime, startMeasureTime } from './timer';
import getPageProps from './getPageProps';
const pagesGetServerSideProps = (props) => __awaiter(void 0, void 0, void 0, function* () {
    // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
    const { query, req } = props;
    let hostname = '';
    if (req) {
        const { headers: { host } } = req;
        hostname = (host === null || host === void 0 ? void 0 : host.includes('localhost')) ? `http://${host}` : `https://${host}`;
    }
    else {
        hostname = `${location.protocol}//${location.host}`;
    }
    try {
        startMeasureTime('start get server side props');
        const slug = (query === null || query === void 0 ? void 0 : query.index) || 'home';
        console.log('pagesGetServerSideProps', hostname, slug);
        StoryblokService.setDevMode();
        StoryblokService.setQuery(query);
        const pageProps = yield getPageProps(slug, hostname);
        endMeasureTime();
        return {
            props: pageProps
        };
    }
    catch (e) {
        console.log('error', e);
        throw new Error('error occured');
    }
});
export default pagesGetServerSideProps;
