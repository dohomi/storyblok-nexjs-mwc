import { CONFIG } from './config';
import { getGlobalState } from './state/state';
export const homepageLinkHandler = () => {
    if (CONFIG.rootDirectory) {
        return '/home';
    }
    const appLocale = getGlobalState('locale');
    return appLocale && appLocale !== CONFIG.defaultLocale ? `/${appLocale}/home` : '/home';
};
export const internalLinkHandler = (url) => {
    if (CONFIG.rootDirectory) {
        const urlArray = url.split('/');
        if (urlArray[0] === CONFIG.rootDirectory) {
            urlArray.shift();
            url = urlArray.join('/');
        }
    }
    else if (CONFIG.suppressSlugLocale) {
        const urlArray = url.split('/');
        if (urlArray.length > 1 && CONFIG.languages.includes(urlArray[0]) && urlArray[1] !== 'home') {
            urlArray.shift();
            url = urlArray.join('/');
        }
    }
    return url.startsWith('/') ? url : `/${url}`;
};
export const linkHandler = (link, options) => {
    const props = {
        href: '/'
    };
    let cachedUrl = link.cached_url;
    if (link.linktype === 'story') {
        props.href = internalLinkHandler(cachedUrl);
    }
    else {
        let href = cachedUrl || '';
        if (href.includes('@')) {
            href = `mailto:${href.replace('mailto:', '')}`;
        }
        else if (href.includes('+')) {
            href = `tel:${href.replace('+', '')}`;
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
export const getLinkAttrs = (link = {}, options = {}) => {
    return linkHandler(link, options);
};
