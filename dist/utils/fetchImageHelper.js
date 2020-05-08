export function getImagePromise({ src, srcSet }) {
    return new Promise((resolve, reject) => {
        getImage({
            src,
            srcSet,
            onReady(src) {
                resolve(src);
            },
            onError(e) {
                reject(e);
            }
        });
    });
}
export function getImage({ src = '', srcSet = '', onReady, onError }) {
    let img = new Image();
    img.src = src;
    img.srcset = srcSet || src;
    // img.crossOrigin = 'anonymous'
    img.onload = () => {
        onReady && onReady(img && (img.currentSrc || img.src)); // return current selected source
        img = null; // dispose image element
    };
    img.onerror = (e) => {
        onError && onError(e);
        img = null;
    };
}
