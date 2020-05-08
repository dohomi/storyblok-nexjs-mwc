import { CONFIG } from './config';
import { getGlobalState } from './state/state';
export var homepageLinkHandler = function () {
    if (CONFIG.rootDirectory) {
        return '/home';
    }
    var appLocale = getGlobalState('locale');
    return appLocale && appLocale !== CONFIG.defaultLocale ? "/" + appLocale + "/home" : '/home';
};
export var internalLinkHandler = function (url) {
    if (CONFIG.rootDirectory) {
        var urlArray = url.split('/');
        if (urlArray[0] === CONFIG.rootDirectory) {
            urlArray.shift();
            url = urlArray.join('/');
        }
    }
    else if (CONFIG.suppressSlugLocale) {
        var urlArray = url.split('/');
        if (urlArray.length > 1 && CONFIG.languages.includes(urlArray[0]) && urlArray[1] !== 'home') {
            urlArray.shift();
            url = urlArray.join('/');
        }
    }
    return url.startsWith('/') ? url : "/" + url;
};
export var linkHandler = function (link, options) {
    var props = {
        href: '/'
    };
    var cachedUrl = link.cached_url;
    if (link.linktype === 'story') {
        props.href = internalLinkHandler(cachedUrl);
    }
    else {
        var href = cachedUrl || '';
        if (href.includes('@')) {
            href = "mailto:" + href.replace('mailto:', '');
        }
        else if (href.includes('+')) {
            href = "tel:" + href.replace('+', '');
        }
        if (options.openExternal) {
            props.target = '_blank';
            props.rel = 'noopener noreferrer';
        }
        props.external = true;
        props.href = href;
    }
    return props;
};
export var getLinkAttrs = function (link, options) {
    if (link === void 0) { link = {}; }
    if (options === void 0) { options = {}; }
    return linkHandler(link, options);
};
