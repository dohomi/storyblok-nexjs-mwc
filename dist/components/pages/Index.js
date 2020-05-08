var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useStoryblok } from '../../utils/hooks/useStoryblok';
import Error from '../../pages/_error';
import AppProvider from '../provider/AppProvider';
import WindowDimensionsProvider from '../provider/WindowDimensionsProvider';
import AppSetupProvider from '../provider/AppSetupProvider';
import GlobalTheme from '../global-theme/GlobalTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppSeo from '../layout/AppSeo';
import Layout from '../layout/Layout';
import Components from '@components';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGlobalState, setGlobalState } from '../../utils/state/state';
import hasWebpSupport from '../../utils/detectWebpSupport';
const Index = (props) => {
    const { error, locale, settings, page } = props, rest = __rest(props, ["error", "locale", "settings", "page"]);
    const { stateSettings, statePage } = useStoryblok({ settings, page });
    const { isFallback } = useRouter();
    if (locale && getGlobalState('locale') !== locale) {
        setGlobalState('locale', locale);
    }
    if (typeof getGlobalState('hasWebpSupport') === 'undefined') {
        hasWebpSupport()
            .then((has) => setGlobalState('hasWebpSupport', has));
    }
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    if (isFallback) {
        return React.createElement("div", null, "Loading...");
    }
    if (error) {
        if (error.type === 'not_supported') {
            return null;
        }
        return React.createElement(Error, { statusCode: error.status, settings: stateSettings, page: statePage });
    }
    if (!statePage && !stateSettings) {
        return React.createElement("h3", null, "No page or settings found");
    }
    if (!statePage) {
        return React.createElement(Error, { statusCode: 404, settings: stateSettings, page: statePage });
    }
    if (!stateSettings) {
        return React.createElement(Error, { statusCode: 404, settings: stateSettings, page: statePage });
    }
    return (React.createElement(AppProvider, { content: rest },
        React.createElement(WindowDimensionsProvider, null,
            React.createElement(AppSetupProvider, { settings: stateSettings, page: statePage },
                React.createElement(GlobalTheme, { settings: stateSettings, rightDrawerWidth: statePage === null || statePage === void 0 ? void 0 : statePage.right_drawer_width },
                    React.createElement(CssBaseline, null),
                    React.createElement(AppSeo, { settings: stateSettings, page: statePage, previewImage: statePage === null || statePage === void 0 ? void 0 : statePage.preview_image }),
                    React.createElement(Layout, { settings: stateSettings }, Components(statePage)))))));
};
export default Index;
