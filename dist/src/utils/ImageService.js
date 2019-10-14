import DeviceDetectService from './DeviceDetectService';
function _getImageSource(_a) {
    var image = _a.image, width = _a.width, height = _a.height;
    var path = '';
    if (width && height) {
        path = parseInt(String(width)) + "x" + parseInt(String(height));
    }
    path += '/smart';
    return imageService(image, path, '');
}
export function getPreviewImageSource(image) {
    var orig = getOriginalImageDimensions(image);
    return _getImageSource({
        image: image,
        width: orig.width / 100,
        height: orig.height / 100
    });
}
export function imageServiceNoWebp(image, option) {
    if (option === void 0) { option = ''; }
    if (image.endsWith('.svg')) {
        return image;
    }
    var imageService = 'https://img2.storyblok.com/';
    var path = image.replace('//a.storyblok.com', '');
    return imageService + option + path;
}
export function getOriginalImageDimensions(src) {
    var splitted = src.split('/');
    var originalDimension = src.split('/')[splitted.length - 3].split('x');
    return {
        width: parseInt(originalDimension[0]),
        height: parseInt(originalDimension[1])
    };
}
export function getImageAttrs(_a) {
    var originalSource = _a.originalSource, width = _a.width, _b = _a.height, height = _b === void 0 ? 0 : _b, filter = _a.filter, fitInColor = _a.fitInColor, smart = _a.smart, focalPoint = _a.focalPoint;
    var originalDimensions = getOriginalImageDimensions(originalSource);
    if (originalDimensions.width < width) {
        width = originalDimensions.width;
    }
    if (height && originalDimensions.height < height) {
        height = originalDimensions.height;
    }
    if (fitInColor) {
        filter += ":fill(" + fitInColor + ")";
    }
    var path = getPath(width, height);
    if (focalPoint) {
        filter += getFocalPoint(originalSource, focalPoint);
    }
    var src = imageService(originalSource, path, filter);
    var imgObj = {
        src: src,
        srcSet: src
    };
    // enable retina sourceset
    if (width <= originalDimensions.width / 2 && height <= originalDimensions.height / 2) {
        imgObj.srcSet = imgObj.src + " 1x, " + imageService(originalSource, getPath(width * 2, height * 2), filter) + " 2x";
    }
    function getPath(width, height) {
        var path = (width || 0) + "x" + (height || 0);
        if (fitInColor) {
            path = 'fit-in/' + path;
        }
        else if (smart && !focalPoint) {
            path += '/smart';
        }
        return path;
    }
    return imgObj;
}
export function getFocalPoint(src, focalPoint) {
    var _a = getOriginalImageDimensions(src), width = _a.width, height = _a.height;
    var focalSplitted = focalPoint.split('x');
    var focalPercentX = parseFloat(focalSplitted[0]) / 100;
    var focalPercentY = parseFloat(focalSplitted[1]) / 100;
    var topLeft = Math.max(0, width * focalPercentX - 50) + "x" + Math.max(0, height * focalPercentY - 50);
    var bottomRight = Math.min(width * focalPercentX + 50, width) + "x" + Math.min(height * focalPercentY + 50, height);
    return ":focal(" + topLeft + ":" + bottomRight + ")";
}
function imageService(image, option, filter) {
    if (option === void 0) { option = ''; }
    if (filter === void 0) { filter = ''; }
    if (image.endsWith('.svg')) {
        return image;
    }
    option && (option += '/');
    var hasWebpSupport = typeof window !== 'undefined' ? window['hasWebpSupport'] : DeviceDetectService.getWebpSupport();
    if (hasWebpSupport) {
        option += 'filters:format(webp)' + filter;
    }
    else if (filter) {
        option += 'filters' + filter;
    }
    return "https://img2.storyblok.com/" + option + image.split('storyblok.com')[1];
}
export default imageService;
