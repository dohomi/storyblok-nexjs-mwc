import StoryblokService from '../../utils/StoryblokService';
import { clearFileCache } from '../../utils/initial-props/fileCache';
export default (_req, res) => {
    StoryblokService.flushCache();
    clearFileCache();
    res.status(200).json({
        message: 'Cache flushed'
    });
};
