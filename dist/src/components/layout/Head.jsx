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
import NextHead from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import StoryblokService from '../../utils/StoryblokService';
import { NextSeo } from 'next-seo';
import imageService, { getOriginalImageDimensions, imageServiceNoWebp } from '../../utils/ImageService';
Router.events.on('onRouteChangeStart', function () { return NProgress.start(); });
Router.events.on('onRouteChangeComplete', function () { return NProgress.done(); });
Router.events.on('onRouteChangeError', function () { return NProgress.done(); });
var iconSizes = [16, 32, 96, 192];
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
var parseOpenGraph = function (settingsOpenGraph, pageOpenGraph, seoMeta, url) {
    // set some defaults of seoMeta
    var openGraph = {
        title: pageOpenGraph.title || seoMeta.title || settingsOpenGraph.title,
        description: pageOpenGraph.description || seoMeta.description || settingsOpenGraph.description,
        url: pageOpenGraph.url || url || settingsOpenGraph.url,
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
var Head = function (_a) {
    var settings = _a.settings, pageSeo = _a.pageSeo;
    var favicon = settings.setup_favicon;
    var seoBody = settings.seo_body || [];
    var pageSeoBody = pageSeo.body || [];
    var seo = {
        title: pageSeo.title || settings.seo_title || 'Website made by Lumen Media',
        description: pageSeo.description || settings.seo_description || 'Website made by Lumen Media',
        noindex: pageSeo.disableRobots || !settings.seo_robots // important to change if go live
    };
    // open graphs
    var settingsOpenGraphs = seoBody.find(function (i) { return i.component === 'seo_open_graph'; });
    var pageOpenGraphs = pageSeoBody.find(function (i) { return i.component === 'seo_open_graph'; });
    if (settingsOpenGraphs || pageOpenGraphs) {
        seo.openGraph = parseOpenGraph(settingsOpenGraphs || {}, pageOpenGraphs || {}, seo, pageSeo.url);
        var facebookAppId = (settingsOpenGraphs && settingsOpenGraphs.app_id) || (pageOpenGraphs && pageOpenGraphs.app_id);
        facebookAppId && (seo.facebook = { appId: facebookAppId });
    }
    // twitter
    var settingsTwitter = seoBody.find(function (i) { return i.component === 'seo_twitter'; }) || undefined;
    if (settingsTwitter) {
        seo.twitter = parseTwitter(settingsTwitter);
    }
    return (<>
      <NextSeo {...seo}/>
      <NextHead>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" key="viewport"/>
        {favicon && iconSizes.map(function (size) { return (<link rel="icon" sizes={size + "/" + size} href={imageService(favicon, size + "x" + size)} key={"fav_" + size}/>); })}
        {!favicon && (<link rel="icon" href="/favicon.ico"/>)}
        {StoryblokService.bridge()}
      </NextHead>
    </>);
};
export default Head;
