export function getImagePromise(_a) {
    var src = _a.src, srcSet = _a.srcSet;
    return new Promise(function (resolve, reject) {
        getImage({
            src: src,
            srcSet: srcSet,
            onReady: function (src) {
                resolve(src);
            },
            onError: function (e) {
                reject(e);
            }
        });
    });
}
export function getImage(_a) {
    var _b = _a.src, src = _b === void 0 ? '' : _b, _c = _a.srcSet, srcSet = _c === void 0 ? '' : _c, onReady = _a.onReady, onError = _a.onError;
    var img = new Image();
    img.src = src;
    img.srcset = srcSet || src;
    // img.crossOrigin = 'anonymous'
    img.onload = function () {
        onReady && onReady(img && (img.currentSrc || img.src)); // return current selected source
        img = null; // dispose image element
    };
    img.onerror = function (e) {
        onError && onError(e);
        img = null;
    };
}
