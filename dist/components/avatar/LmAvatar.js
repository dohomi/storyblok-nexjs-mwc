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
import React, { useEffect, useState } from 'react';
import SbEditable from 'storyblok-react';
import Avatar from '@material-ui/core/Avatar';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { useInView } from 'react-intersection-observer';
import LmIcon from '../icon/LmIcon';
import { getImageAttrs } from '../../utils/ImageService';
import clsx from 'clsx';
var sizeMap = {
    dense: {
        container: 30,
        icon: 18
    },
    large: {
        container: 50,
        icon: 25
    },
    xlarge: {
        container: 64,
        icon: 32
    }
};
var LmAvatar = function (_a) {
    var content = _a.content;
    var _b = useInView(intersectionDefaultOptions), refIntersectionObserver = _b[0], inView = _b[1];
    var iconName = content.icon && content.icon.name;
    var imageSrc = content.image;
    var customSize = content.custom_size && Number(content.custom_size);
    var _c = useState({}), imageAttrs = _c[0], setImageSrc = _c[1];
    var style = {
        color: content.color && content.color.rgba,
        backgroundColor: content.background_color && content.background_color.rgba
    };
    if (content.size) {
        var individualSize = sizeMap[content.size];
        if (individualSize) {
            style.width = individualSize.container;
            style.height = individualSize.container;
            style.fontSize = individualSize.icon;
        }
        else {
            console.error("Size of avatar is not defined inside of LmAvatar: " + content.size);
        }
    }
    if (customSize) {
        style.width = customSize;
        style.height = customSize;
        style.fontSize = customSize / 2;
    }
    useEffect(function () {
        if (inView && imageSrc) {
            var imgAttrs = getImageAttrs({
                originalSource: imageSrc,
                width: (customSize && customSize > 128) ? customSize : 128,
                height: (customSize && customSize > 128) ? customSize : 128,
                smart: true
            });
            setImageSrc(imgAttrs);
        }
    }, [inView, imageSrc, customSize]);
    return (React.createElement(SbEditable, { content: content },
        React.createElement(Avatar, __assign({ ref: refIntersectionObserver, variant: content.variant || 'circle', style: style, className: clsx(content.class_names && content.class_names.values) }, imageAttrs),
            content.letter,
            iconName && React.createElement(LmIcon, { iconName: iconName }))));
};
export default LmAvatar;
