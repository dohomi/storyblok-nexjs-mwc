import React from 'react';
import Image from './Image';
import ImageSvg from './ImageSvg';
const ImageElement = ({ content }) => {
    const isSvgImage = content.source && content.source.endsWith('.svg');
    if (isSvgImage) {
        return React.createElement(ImageSvg, { content: content });
    }
    return React.createElement(Image, { content: content });
};
export default ImageElement;
