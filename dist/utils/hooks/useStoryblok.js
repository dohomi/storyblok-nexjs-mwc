import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StoryblokService from '../StoryblokService';
export const useStoryblok = (props) => {
    var _a, _b;
    const { query } = useRouter(); // query only set in SSR mode
    const { page, settings } = props;
    if (query) {
        StoryblokService.setQuery(query);
    }
    // const insideStoryblok = !!query?._storyblok
    const settingsUid = (_a = props.settings) === null || _a === void 0 ? void 0 : _a.uuid;
    const pageUid = (_b = props.page) === null || _b === void 0 ? void 0 : _b.uuid;
    const [statePage, setPage] = useState(page);
    const [stateSettings, setSettings] = useState(settings);
    useEffect(() => {
        if (pageUid !== (statePage === null || statePage === void 0 ? void 0 : statePage.uuid)) {
            // console.log('different page', pageUid, statePage.uuid)
            setPage(page);
        }
    }, [pageUid, statePage, page]);
    useEffect(() => {
        if (settingsUid !== (stateSettings === null || stateSettings === void 0 ? void 0 : stateSettings.uuid)) {
            // console.log('different settings', settingsUid, stateSettings.uuid)
            setSettings(settings);
        }
    }, [settingsUid, stateSettings, settings]);
    useEffect(() => {
        StoryblokService.initEditor({ page, setPage, settings, setSettings });
    }, []);
    // return !insideStoryblok ? props : content
    // return content
    // console.log(props.page._uid)
    return {
        statePage,
        stateSettings
    };
};
