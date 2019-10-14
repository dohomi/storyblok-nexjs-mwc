import StoryblokService from '../../utils/StoryblokService';
export default (function (_req, res) {
    StoryblokService.flushCache();
    res.status(200).json({
        message: 'Cache flushed'
    });
});
