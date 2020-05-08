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
import SbEditable from 'storyblok-react';
import Components from '@components';
import SwipeableViews from 'react-swipeable-views';
import React, { memo, useState } from 'react';
import clsx from 'clsx';
import SliderChild from './SliderChild';
import { makeStyles } from '@material-ui/core/styles';
import InvertedIndicator from './InvertedIndicator';
import Typography from '@material-ui/core/Typography';
import useDeviceDimensions from '../../utils/hooks/useDeviceDimensions';
import { ChevronLeft, ChevronRight } from 'mdi-material-ui';
var chunkArray = function (myArray, chunkSize) {
    var results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }
    return results;
};
export var useStyles = makeStyles({
    carousel: {
        position: 'relative',
        '& [data-swipeable="true"]': {
            overflow: 'hidden',
            height: '100%',
            width: '100%',
            '& > div': {
                overflow: 'hidden',
                height: '100%',
                width: '100%'
            }
        },
        '& .react-swipeable-view-container .MuiContainer-root': {
            padding: '0px !important',
            margin: '0px !important',
            maxWidth: 'inherit !important'
        },
        '&.carousel__arrows_dark': {
            '& .MuiSvgIcon-root': {
                color: 'rgba(0,0,0,0.8)'
            }
        },
        '& .carousel-indicators': {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center'
        },
        '& .carousel-control-next, & .carousel-control-prev': {
            position: 'absolute',
            height: '100%',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '& .MuiSvgIcon-root': {
                fontSize: '4rem',
                color: 'rgba(255,255,255,0.8)'
            }
        },
        '& .carousel-control-next': {
            right: 0
        }
    }
});
var Slider = function (_a) {
    var content = _a.content;
    var _b = useState(0), slide = _b[0], setSlide = _b[1];
    var isMobile = useDeviceDimensions().isMobile;
    var classes = useStyles();
    var wrapInColumns = content.slides_per_view && !isMobile;
    var contentBody = content.body || [];
    var body = wrapInColumns ? chunkArray(contentBody.slice(0), content.slides_per_view) : contentBody;
    var properties = content.property || [];
    var styles = {};
    var paginationClasses = clsx('carousel-indicators', { 'd-none': properties.includes('hide_pagination') });
    var carouselPrevClasses = clsx('carousel-control-prev', { 'd-none': properties.includes('hide_arrows') });
    var carouselNextClasses = clsx('carousel-control-next', { 'd-none': properties.includes('hide_arrows') });
    var carouselClasses = clsx(classes.carousel, 'carousel slide', properties.map(function (i) { return 'carousel__' + i; }));
    function handleChangeIndex(item) {
        setSlide(body.findIndex(function (i) { return i._uid === item._uid; }));
    }
    if (content.background_color) {
        styles.backgroundColor = content.background_color && content.background_color.rgba;
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: carouselClasses, style: styles },
            React.createElement(SwipeableViews, { index: slide, onChangeIndex: function (i) { return setSlide(i); } }, wrapInColumns ? body.map(function (child, index) {
                return React.createElement(SliderChild, { key: "swipeable_" + index, body: child, sectionVariant: content.section_variant });
            }) : body.map(function (item) {
                if (item.component === 'section') {
                    var newOpts = __assign(__assign({}, item), { presetVariant: content.section_variant || 'transparent' });
                    return Components(newOpts);
                }
                return Components(item);
            })),
            React.createElement("a", { className: carouselPrevClasses, role: "button", onClick: function () { return setSlide(slide === 0 ? body.length - 1 : slide - 1); } },
                React.createElement(ChevronLeft, null),
                React.createElement(Typography, { variant: 'srOnly' }, "Previous")),
            React.createElement("a", { className: carouselNextClasses, role: "button", onClick: function () { return setSlide(slide === body.length - 1 ? 0 : slide + 1); } },
                React.createElement(ChevronRight, null),
                React.createElement(Typography, { variant: 'srOnly' }, "Next")),
            React.createElement("div", { className: paginationClasses }, body.map(function (item, i) { return (React.createElement(InvertedIndicator, { key: item._uid || "pagination_" + i, active: slide === i, color: properties.includes('pagination_dark') ? 'dark' : 'light', onClick: function () { return handleChangeIndex(item); } })); })))));
};
export default memo(Slider);
