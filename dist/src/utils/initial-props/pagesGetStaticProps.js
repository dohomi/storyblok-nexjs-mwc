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
import { getBaseProps } from './getBaseProps';
import getPageProps from './getPageProps';
const pagesGetStaticProps = (props) => __awaiter(void 0, void 0, void 0, function* () {
    // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
    const { params, previewData } = props;
    const slug = (params === null || params === void 0 ? void 0 : params.index) || 'home';
    startMeasureTime('start get static props');
    if (Array.isArray(slug) && slug[0] === '_dev_') {
        return { props: getBaseProps({ type: 'not_supported' }) }; // do nothing _dev_ mode is active
    }
    try {
        console.log('pagesGetStaticProps', previewData);
        if (previewData && previewData.query) {
            StoryblokService.setQuery(previewData.query);
        }
        const pageProps = yield getPageProps(slug);
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
export default pagesGetStaticProps;
