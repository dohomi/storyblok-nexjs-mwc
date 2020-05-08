var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Components from '@components';
import Layout from '../components/layout/Layout';
import WindowDimensionsProvider from '../components/provider/WindowDimensionsProvider';
import GlobalTheme from '../components/global-theme/GlobalTheme';
import StoryblokService from '../utils/StoryblokService';
import { CONFIG } from '../utils/config';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useGlobalState } from '../utils/state/state';
import AppSetupProvider from '../components/provider/AppSetupProvider';
const statusCodes = {
    400: 'Bad Request',
    401: 'Not Authorized | Invalid API key',
    404: 'This page could not be found',
    500: 'Internal Server Error',
    501: 'Not Implemented'
};
const getErrorPath = ({ locale, statusCode }) => {
    const currentLocale = locale !== CONFIG.defaultLocale ? locale : '';
    const directory = CONFIG.rootDirectory || currentLocale || '';
    return `cdn/stories/${directory ? `${directory}/` : ''}error-${statusCode}`;
};
const ErrorContent = ({ statusCode }) => {
    const title = statusCodes[statusCode] || 'An unexpected error has occurred';
    const [locale] = useGlobalState('locale');
    const [errorContent, setErrorContent] = useState(undefined);
    useEffect(() => {
        const fetchErrorContent = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield StoryblokService.get(getErrorPath({ statusCode, locale }));
        });
        fetchErrorContent()
            .then(({ data }) => {
            const errorContext = data && data.story && data.story.content;
            if (errorContext) {
                setErrorContent(errorContext);
            }
            else {
                setErrorContent(null);
            }
        })
            .catch(e => {
            console.error(e);
            setErrorContent(null);
        });
    }, [statusCode]);
    const errorTitle = (errorContent && errorContent.title) || `${statusCode} - ${title}`;
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, null, errorContent !== undefined && React.createElement("title", null, errorTitle)),
        React.createElement("div", { className: "p-5" },
            errorContent && errorContent.body && errorContent.body.map(blok => Components(blok)),
            errorContent === null && (React.createElement("div", null,
                statusCode ? React.createElement("h1", null, statusCode) : null,
                React.createElement("div", null,
                    React.createElement("h2", null,
                        title,
                        ".")))))));
};
const Error = (props) => {
    let { statusCode, settings } = props;
    if (statusCode === 401) {
        console.log('error on Storyblok PREVIEW and PUBLIC token:', process.env.NODE_ENV, process.env.STORYBLOK_PREVIEW, process.env.STORYBLOK_PUBLIC);
        return React.createElement("h3", null, "Storyblok 401 error received");
    }
    if (!(settings && settings._uid)) {
        return React.createElement("h3", null, "No settings found");
    }
    return (React.createElement(WindowDimensionsProvider, null,
        React.createElement(GlobalTheme, { settings: settings },
            React.createElement(AppSetupProvider, { settings: settings },
                React.createElement(CssBaseline, null),
                React.createElement(Head, null,
                    React.createElement("meta", { key: "robots", name: "robots", content: "noindex" })),
                React.createElement(Layout, { settings: settings },
                    React.createElement(ErrorContent, { statusCode: statusCode }))))));
};
// Error.getInitialProps = async ({ res, err }): Promise<ErrorComponentProps> => {
//   const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404
//   return { statusCode: statusCode as number, settings: { theme_base: 'dark', _uid: '', component: 'global' } }
// }
export default Error;
