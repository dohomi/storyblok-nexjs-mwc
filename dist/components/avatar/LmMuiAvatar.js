import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useInView } from 'react-intersection-observer';
import { intersectionDefaultOptions } from '../../utils/intersectionObserverConfig';
import { getImageAttrs } from '../../utils/ImageService';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
var useStyles = makeStyles({
    avatar: {
        '&.small': {
            width: 24,
            height: 24
        },
        '&.large': {
            width: 52,
            height: 52
        },
        '.xlarge': {
            width: 64,
            height: 64
        }
    }
});
var LmMuiAvatar = function (_a) {
    var _b;
    var src = _a.src, size = _a.size;
    var classes = useStyles();
    var _c = useInView(intersectionDefaultOptions), reference = _c[0], inView = _c[1];
    var _d = useState({ src: '', srcSet: '' }), imageAttrs = _d[0], setImageSrc = _d[1];
    useEffect(function () {
        if (!inView) {
            return;
        }
        var imgAttrs = getImageAttrs({ originalSource: src, width: 128 });
        setImageSrc(imgAttrs);
    }, [inView]);
    return (React.createElement(Avatar, { ref: reference, src: imageAttrs.src, srcSet: imageAttrs.srcSet, className: clsx(classes.avatar, (_b = {},
            _b[size] = !!size,
            _b)) }));
};
export default LmMuiAvatar;
