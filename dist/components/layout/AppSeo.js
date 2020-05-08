import { NextSeo } from 'next-seo';
import { getOriginalImageDimensions, imageServiceNoWebp } from '../../utils/ImageService';
import * as React from 'react';
import { CONFIG } from '../../utils/config';
import { useRouter } from 'next/router';
const mapOpenGraphImage = (item) => {
    if (!item.url)
        return;
    let dimensions = getOriginalImageDimensions(item.url);
    const imgPath = (item.width || item.height) ? `${item.width || 0}x${item.height || 0}` : '';
    if (item.width || item.height) {
        // delete both original dimensions
        delete dimensions.width;
        delete dimensions.height;
        item.width && (dimensions.width = item.width);
        item.height && (dimensions.height = item.height);
    }
    return Object.assign(Object.assign({}, dimensions), { alt: item.alt, url: imageServiceNoWebp(item.url, imgPath) });
};
const parseOpenGraph = (settingsOpenGraph, pageOpenGraph, seoMeta) => {
    // set some defaults of seoMeta
    const openGraph = {
        title: pageOpenGraph.title || seoMeta.title || settingsOpenGraph.title,
        description: pageOpenGraph.description || seoMeta.description || settingsOpenGraph.description,
        url: pageOpenGraph.url || settingsOpenGraph.url,
        type: pageOpenGraph.type || settingsOpenGraph.type,
        site_name: pageOpenGraph.site_name || settingsOpenGraph.site_name,
        locale: pageOpenGraph.locale || settingsOpenGraph.locale
    };
    const images = [];
    // settings images
    if (settingsOpenGraph.images) {
        settingsOpenGraph.images.forEach((img) => {
            let parsed = mapOpenGraphImage(img);
            parsed && images.push(parsed);
        });
    }
    // page images
    if (pageOpenGraph.images) {
        pageOpenGraph.images.forEach((item) => {
            let parsed = mapOpenGraphImage(item);
            parsed && images.push(parsed);
        });
    }
    openGraph.images = images;
    return openGraph;
};
const parseTwitter = (values) => {
    const twitter = values;
    if (twitter.card_type) {
        twitter.cardType = twitter.card_type;
        delete twitter.card_type; // remove wrong string
    }
    return twitter;
};
const getCanonicalUrl = (hostname = '', url) => {
    if (url.endsWith('home')) {
        url = url.replace('home', '');
    }
    else if (url.endsWith('home/')) {
        url = url.replace('home/', '');
    }
    return hostname + url;
};
const AppSeo = ({ settings, page, previewImage }) => {
    const router = useRouter();
    const seoBody = settings.seo_body || [];
    const pageSeoBody = page.seo_body || [];
    const robotsIndexFollow = CONFIG.overwriteDisableIndex || page.meta_robots || !settings.seo_robots; // todo additionally disable .now.sh domains
    const seo = {
        title: page.meta_title || settings.seo_title || 'Website made by Lumen Media',
        description: page.meta_description || settings.seo_description || 'Website made by Lumen Media',
        noindex: robotsIndexFollow,
        nofollow: robotsIndexFollow
    };
    // open graphs
    const settingsOpenGraphs = seoBody.find(i => i.component === 'seo_open_graph');
    const pageOpenGraphs = pageSeoBody.find(i => i.component === 'seo_open_graph') || {};
    if (previewImage) {
        pageOpenGraphs.images = pageOpenGraphs.images || [];
        pageOpenGraphs.images.push({ url: previewImage });
    }
    if (settingsOpenGraphs || pageOpenGraphs) {
        seo.openGraph = parseOpenGraph(settingsOpenGraphs || {}, pageOpenGraphs, seo);
        const facebookAppId = (settingsOpenGraphs && settingsOpenGraphs.app_id) || (pageOpenGraphs && pageOpenGraphs.app_id);
        facebookAppId && (seo.facebook = { appId: facebookAppId });
    }
    // twitter
    const settingsTwitter = seoBody.find(i => i.component === 'seo_twitter') || undefined;
    if (settingsTwitter) {
        seo.twitter = parseTwitter(settingsTwitter);
    }
    if (settings.seo_website_url) {
        seo.canonical = getCanonicalUrl(settings.seo_website_url, router === null || router === void 0 ? void 0 : router.asPath);
    }
    else {
        if (typeof window !== 'undefined') {
            console.warn('set up seo_website_url inside of settings to have a canonical tag');
        }
    }
    return React.createElement(NextSeo, Object.assign({}, seo));
};
export default AppSeo;
