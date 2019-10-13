import StoryblokService from '../../utils/StoryblokService';
export default (function (req, res) {
    StoryblokService.flushCache();
    res.status(200).json({
        message: 'Cache flushed'
    });
});
