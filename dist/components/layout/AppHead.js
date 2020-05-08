import imageService from '../../utils/ImageService';
import StoryblokService from '../../utils/StoryblokService';
import NextHead from 'next/head';
import * as React from 'react';
import { memo } from 'react';
import { getFontBasedOnSetting } from '../../utils/parseFont';
import Router from 'next/router';
import NProgress from 'nprogress';
import { CONFIG } from '../../utils/config';
const trackGA = (url) => {
    if (CONFIG.GA && window !== undefined && window['gtag']) {
        window['gtag']('config', CONFIG.GA, {
            page_location: url,
            page_title: window.document.title
        });
    }
};
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', (url) => {
    NProgress.done();
    trackGA(url);
});
Router.events.on('routeChangeError', () => NProgress.done());
const AppHead = ({ settings }) => {
    const favicon = settings.setup_favicon;
    const loadFonts = getFontBasedOnSetting(settings);
    const isProduction = !StoryblokService.insideVisualComposer() && process.env.NODE_ENV === 'production';
    if (process.env.NODE_ENV === 'development') {
        console.log('render app head');
    }
    return (React.createElement(NextHead, null,
        React.createElement("meta", { name: "viewport", content: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no", key: "viewport" }),
        React.createElement("link", { rel: "preconnect", href: "https://fonts.gstatic.com/", crossOrigin: "anonymous" }),
        React.createElement("link", { rel: "preconnect", href: "https://cdn.jsdelivr.net/", crossOrigin: "anonymous" }),
        React.createElement("link", { rel: "preconnect", href: "https://img2.storyblok.com/", crossOrigin: "anonymous" }),
        isProduction && CONFIG.GA && (React.createElement(React.Fragment, null,
            React.createElement("link", { rel: "preconnect", href: "https://www.googletagmanager.com/", crossOrigin: "anonymous" }),
            React.createElement("link", { rel: "preconnect", href: "https://www.google-analytics.com/", crossOrigin: "anonymous" }))),
        favicon && (React.createElement(React.Fragment, null,
            React.createElement("link", { rel: "icon", href: imageService(favicon, `32x32`), sizes: "32x32", key: `favicon` }),
            React.createElement("link", { rel: "apple-touch-icon-precomposed", href: imageService(favicon, `152x152`), key: `apple-touch-icon-precomposed` }))),
        React.createElement("link", { href: `https://fonts.googleapis.com/css?family=${loadFonts.join('|')}&display=swap`, rel: "stylesheet" }),
        settings.setup_google_site_verification &&
            React.createElement("meta", { name: "google-site-verification", content: settings.setup_google_site_verification, key: "google-site-verification" })));
};
export default memo(AppHead);
