var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import StoryblokService from '../../../utils/StoryblokService';
import { fetchSharedStoryblokContent } from '../../../utils/initial-props/storyblokDeliveryResolver';
export default function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const locale = req.query.locale;
        StoryblokService.setDevMode();
        const data = yield fetchSharedStoryblokContent(locale ? locale : undefined);
        res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
        res.status(200).json(data);
    });
}
