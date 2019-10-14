export var linkHandler = function (props, link, options) {
    var isInternalLink = link.linktype === 'story';
    var cachedUrl = link.cached_url;
    if (isInternalLink) {
        props.to = !cachedUrl.startsWith('/') ? "/" + cachedUrl : cachedUrl;
    }
    else {
        var href = cachedUrl || '';
        if (href.includes('@')) {
            href = "mailto:" + href;
        }
        else if (href.includes('+')) {
            href = "tel:" + href.replace('+', '');
        }
        if (options.openExternal) {
            props.target = '_blank';
        }
        props.rel = 'noopener noreferrer';
        props.href = href;
    }
};
