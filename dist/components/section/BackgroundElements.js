import React from 'react';
import imageService from '../../utils/ImageService';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
var BackgroundElements = function (_a) {
    var _b = _a.elements, elements = _b === void 0 ? [] : _b;
    var _c = useInView(intersectionDefaultOptions), viewRef = _c[0], inView = _c[1];
    var styleElement = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    };
    if (inView) {
        styleElement.background = elements.map(function (item) {
            var elementType = item.component;
            switch (elementType) {
                case 'background_element_item': {
                    var url = imageService(item.url || '', '');
                    return "url('" + url + "') " + (item.horizontal || 'left') + " " + (item.vertical || 'top') + "/" + (item.size || 'auto') + " " + (item.repeat || 'no-repeat');
                }
                case 'background_element_color': {
                    return item.color && item.color.rgba;
                }
                case 'background_element_gradient': {
                    return item.value;
                }
            }
        }).filter(function (i) { return i; }).join(',');
    }
    return (React.createElement("div", { ref: viewRef, style: styleElement }));
};
export default BackgroundElements;
