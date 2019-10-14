import React from 'react';
import Image from './Image';
import ImageSvg from './ImageSvg';
var ImageElement = function (_a) {
    var content = _a.content;
    var isSvgImage = content.source && content.source.endsWith('.svg');
    if (isSvgImage) {
        return <ImageSvg content={content}/>;
    }
    return <Image content={content}/>;
};
export default ImageElement;
