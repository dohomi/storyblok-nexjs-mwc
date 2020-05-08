var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Document, { Head, Main, NextScript } from 'next/document';
import StoryblokService from '../utils/StoryblokService';
import React from 'react';
import { CONFIG } from '../utils/config';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { getGlobalState } from '../utils/state/state';
class MyDocument extends Document {
    static getInitialProps(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheets = new ServerStyleSheets();
            const originalRenderPage = ctx.renderPage;
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheets.collect(React.createElement(App, Object.assign({}, props)))
            });
            const initialProps = yield Document.getInitialProps(ctx);
            return Object.assign(Object.assign({}, initialProps), { isProduction: !StoryblokService.insideVisualComposer() && process.env.NODE_ENV === 'production', 
                // Styles fragment is rendered after the app and page rendering finish.
                styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()] });
        });
    }
    setGoogleGTag() {
        return {
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${CONFIG.GA}');
      `
        };
    }
    render() {
        var _a;
        const locale = getGlobalState('locale');
        // @ts-ignore
        const { isProduction } = this.props;
        const settings = (_a = this.props.__NEXT_DATA__.props) === null || _a === void 0 ? void 0 : _a.settings;
        const googleAnalyticsId = CONFIG.GA || (settings === null || settings === void 0 ? void 0 : settings.setup_google_analytics);
        return (React.createElement("html", { lang: locale },
            React.createElement(Head, null),
            React.createElement("body", { className: "lm-body__root" },
                React.createElement(Main, null),
                React.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `
      var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}';`
                    } }),
                React.createElement(NextScript, null),
                isProduction && googleAnalyticsId && (React.createElement(React.Fragment, null,
                    React.createElement("script", { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}` }),
                    React.createElement("script", { dangerouslySetInnerHTML: this.setGoogleGTag() }))),
                StoryblokService.insideVisualComposer() && (React.createElement("script", { src: `//app.storyblok.com/f/storyblok-latest.js?t=${StoryblokService.getToken()}` })))));
    }
}
export default MyDocument;
