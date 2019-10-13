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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { CardMedia } from '@rmwc/card';
import { getImageAttrs } from '../../utils/ImageService';
import { getImage } from '../../utils/fetchImageHelper';
import { useEffect, useState } from 'react';
var CardMediaElement = function (_a) {
    var image_size = _a.image_size, sixteenByNine = _a.sixteenByNine, square = _a.square, children = _a.children, inView = _a.inView, image = _a.image, variant = _a.variant, width = _a.width, height = _a.height;
    variant = variant || [];
    var _b = __read(useState({
        color: variant.includes('font_white') ? 'white' : 'inherit',
        backgroundSize: image_size || 'cover'
    }), 2), styles = _b[0], setStyles = _b[1];
    useEffect(function () {
        if (inView && width && height && image) {
            var img = getImageAttrs({
                originalSource: image,
                width: width,
                height: height,
                smart: true
            });
            getImage(__assign(__assign({}, img), { onReady: function (src) {
                    setStyles(__assign(__assign({}, styles), { backgroundImage: "url(\"" + src + "\")", filter: 'blur(0)', backgroundColor: 'transparent' }));
                } }));
        }
    }, [width, height, image, inView]);
    return (<CardMedia style={styles} sixteenByNine={sixteenByNine} className="progressive-img-blur-container" square={square}>
      {children}
    </CardMedia>);
};
export default CardMediaElement;
