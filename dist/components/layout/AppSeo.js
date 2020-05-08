var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { NextSeo } from 'next-seo';
import { getOriginalImageDimensions, imageServiceNoWebp } from '../../utils/ImageService';
import * as React from 'react';
import { CONFIG } from '../../utils/config';
import { useRouter } from 'next/router';
var mapOpenGraphImage = function (item) {
    if (!item.url)
        return;
    var dimensions = getOriginalImageDimensions(item.url);
    var imgPath = (item.width || item.height) ? (item.width || 0) + "x" + (item.height || 0) : '';
    if (item.width || item.height) {
        // delete both original dimensions
        delete dimensions.width;
        delete dimensions.height;
        item.width && (dimensions.width = item.width);
        item.height && (dimensions.height = item.height);
    }
    return __assign(__assign({}, dimensions), { alt: item.alt, url: imageServiceNoWebp(item.url, imgPath) });
};
var parseOpenGraph = function (settingsOpenGraph, pageOpenGraph, seoMeta) {
    // set some defaults of seoMeta
    var openGraph = {
        title: pageOpenGraph.title || seoMeta.title || settingsOpenGraph.title,
        description: pageOpenGraph.description || seoMeta.description || settingsOpenGraph.description,
        url: pageOpenGraph.url || settingsOpenGraph.url,
        type: pageOpenGraph.type || settingsOpenGraph.type,
        site_name: pageOpenGraph.site_name || settingsOpenGraph.site_name,
        locale: pageOpenGraph.locale || settingsOpenGraph.locale
    };
    var images = [];
    // settings images
    if (settingsOpenGraph.images) {
        settingsOpenGraph.images.forEach(function (img) {
            var parsed = mapOpenGraphImage(img);
            parsed && images.push(parsed);
        });
    }
    // page images
    if (pageOpenGraph.images) {
        pageOpenGraph.images.forEach(function (item) {
            var parsed = mapOpenGraphImage(item);
            parsed && images.push(parsed);
        });
    }
    openGraph.images = images;
    return openGraph;
};
var parseTwitter = function (values) {
    var twitter = values;
    if (twitter.card_type) {
        twitter.cardType = twitter.card_type;
        delete twitter.card_type; // remove wrong string
    }
    return twitter;
};
var getCanonicalUrl = function (hostname, url) {
    if (hostname === void 0) { hostname = ''; }
    if (url.endsWith('home')) {
        url = url.replace('home', '');
    }
    else if (url.endsWith('home/')) {
        url = url.replace('home/', '');
    }
    return hostname + url;
};
var AppSeo = function (_a) {
    var settings = _a.settings, page = _a.page, previewImage = _a.previewImage;
    var router = useRouter();
    var seoBody = settings.seo_body || [];
    var pageSeoBody = page.seo_body || [];
    var robotsIndexFollow = CONFIG.overwriteDisableIndex || page.meta_robots || !settings.seo_robots; // todo additionally disable .now.sh domains
    var seo = {
        title: page.meta_title || settings.seo_title || 'Website made by Lumen Media',
        description: page.meta_description || settings.seo_description || 'Website made by Lumen Media',
        noindex: robotsIndexFollow,
        nofollow: robotsIndexFollow
    };
    // open graphs
    var settingsOpenGraphs = seoBody.find(function (i) { return i.component === 'seo_open_graph'; });
    var pageOpenGraphs = pageSeoBody.find(function (i) { return i.component === 'seo_open_graph'; }) || {};
    if (previewImage) {
        pageOpenGraphs.images = pageOpenGraphs.images || [];
        pageOpenGraphs.images.push({ url: previewImage });
    }
    if (settingsOpenGraphs || pageOpenGraphs) {
        seo.openGraph = parseOpenGraph(settingsOpenGraphs || {}, pageOpenGraphs, seo);
        var facebookAppId = (settingsOpenGraphs && settingsOpenGraphs.app_id) || (pageOpenGraphs && pageOpenGraphs.app_id);
        facebookAppId && (seo.facebook = { appId: facebookAppId });
    }
    // twitter
    var settingsTwitter = seoBody.find(function (i) { return i.component === 'seo_twitter'; }) || undefined;
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
    return React.createElement(NextSeo, __assign({}, seo));
};
export default AppSeo;
