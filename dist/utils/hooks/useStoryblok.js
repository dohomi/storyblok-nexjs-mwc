import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StoryblokService from '../StoryblokService';
export var useStoryblok = function (props) {
    var _a, _b;
    var query = useRouter().query; // query only set in SSR mode
    var page = props.page, settings = props.settings;
    if (query) {
        StoryblokService.setQuery(query);
    }
    // const insideStoryblok = !!query?._storyblok
    var settingsUid = (_a = props.settings) === null || _a === void 0 ? void 0 : _a.uuid;
    var pageUid = (_b = props.page) === null || _b === void 0 ? void 0 : _b.uuid;
    var _c = useState(page), statePage = _c[0], setPage = _c[1];
    var _d = useState(settings), stateSettings = _d[0], setSettings = _d[1];
    useEffect(function () {
        if (pageUid !== (statePage === null || statePage === void 0 ? void 0 : statePage.uuid)) {
            // console.log('different page', pageUid, statePage.uuid)
            setPage(page);
        }
    }, [pageUid, statePage, page]);
    useEffect(function () {
        if (settingsUid !== (stateSettings === null || stateSettings === void 0 ? void 0 : stateSettings.uuid)) {
            // console.log('different settings', settingsUid, stateSettings.uuid)
            setSettings(settings);
        }
    }, [settingsUid, stateSettings, settings]);
    useEffect(function () {
        StoryblokService.initEditor({ page: page, setPage: setPage, settings: settings, setSettings: setSettings });
    }, []);
    // return !insideStoryblok ? props : content
    // return content
    // console.log(props.page._uid)
    return {
        statePage: statePage,
        stateSettings: stateSettings
    };
};
