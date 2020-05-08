import { getGlobalState } from './state/state';
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
    var _a = splitted[splitted.length - 3].split('x'), originalWidth = _a[0], originalHeight = _a[1];
    return {
        width: parseInt(originalWidth),
        height: parseInt(originalHeight)
    };
}
export function getImageAttrs(_a) {
    var originalSource = _a.originalSource, _b = _a.width, width = _b === void 0 ? 0 : _b, _c = _a.height, height = _c === void 0 ? 0 : _c, _d = _a.filter, filter = _d === void 0 ? '' : _d, fitInColor = _a.fitInColor, smart = _a.smart, focalPoint = _a.focalPoint;
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
var boundCoordinate = function (value, upperBound) {
    value = Math.max(0, value);
    value = Math.min(value, upperBound);
    return Math.ceil(value);
};
var FOCAL_SQUARE_LENGTH = 100;
export function getFocalPoint(src, focalPoint) {
    var _a = getOriginalImageDimensions(src), width = _a.width, height = _a.height;
    var _b = focalPoint.split('x'), focalPointXVal = _b[0], focalPointYVal = _b[1];
    var focalPointX = parseInt(focalPointXVal);
    var focalPointY = parseInt(focalPointYVal);
    var top = boundCoordinate((focalPointY / 100) * height - FOCAL_SQUARE_LENGTH / 2, height);
    var left = boundCoordinate((focalPointX / 100) * width - FOCAL_SQUARE_LENGTH / 2, width);
    var bottom = boundCoordinate(top + FOCAL_SQUARE_LENGTH, height);
    var right = boundCoordinate(left + FOCAL_SQUARE_LENGTH, width);
    return ":focal(" + left + "x" + top + ":" + right + "x" + bottom + ")";
}
export default function imageService(image, option, filter) {
    if (option === void 0) { option = ''; }
    if (filter === void 0) { filter = ''; }
    if (image.endsWith('.svg')) {
        return image;
    }
    option && (option += '/');
    if (getGlobalState('hasWebpSupport')) {
        option += 'filters:format(webp)' + filter;
    }
    else if (filter) {
        option += 'filters' + filter;
    }
    return "https://img2.storyblok.com/" + option + image.split('storyblok.com')[1];
}
