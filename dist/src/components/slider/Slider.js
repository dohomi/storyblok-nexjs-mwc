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
const chunkArray = (myArray, chunkSize) => {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }
    return results;
};
export const useStyles = makeStyles({
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
const Slider = ({ content }) => {
    const [slide, setSlide] = useState(0);
    const { isMobile } = useDeviceDimensions();
    const classes = useStyles();
    const wrapInColumns = content.slides_per_view && !isMobile;
    const contentBody = content.body || [];
    const body = wrapInColumns ? chunkArray(contentBody.slice(0), content.slides_per_view) : contentBody;
    const properties = content.property || [];
    const styles = {};
    const paginationClasses = clsx('carousel-indicators', { 'd-none': properties.includes('hide_pagination') });
    const carouselPrevClasses = clsx('carousel-control-prev', { 'd-none': properties.includes('hide_arrows') });
    const carouselNextClasses = clsx('carousel-control-next', { 'd-none': properties.includes('hide_arrows') });
    const carouselClasses = clsx(classes.carousel, 'carousel slide', properties.map(i => 'carousel__' + i));
    function handleChangeIndex(item) {
        setSlide(body.findIndex(i => i._uid === item._uid));
    }
    if (content.background_color) {
        styles.backgroundColor = content.background_color && content.background_color.rgba;
    }
    return (React.createElement(SbEditable, { content: content },
        React.createElement("div", { className: carouselClasses, style: styles },
            React.createElement(SwipeableViews, { index: slide, onChangeIndex: (i) => setSlide(i) }, wrapInColumns ? body.map((child, index) => {
                return React.createElement(SliderChild, { key: `swipeable_${index}`, body: child, sectionVariant: content.section_variant });
            }) : body.map(item => {
                if (item.component === 'section') {
                    let newOpts = Object.assign(Object.assign({}, item), { presetVariant: content.section_variant || 'transparent' });
                    return Components(newOpts);
                }
                return Components(item);
            })),
            React.createElement("a", { className: carouselPrevClasses, role: "button", onClick: () => setSlide(slide === 0 ? body.length - 1 : slide - 1) },
                React.createElement(ChevronLeft, null),
                React.createElement(Typography, { variant: 'srOnly' }, "Previous")),
            React.createElement("a", { className: carouselNextClasses, role: "button", onClick: () => setSlide(slide === body.length - 1 ? 0 : slide + 1) },
                React.createElement(ChevronRight, null),
                React.createElement(Typography, { variant: 'srOnly' }, "Next")),
            React.createElement("div", { className: paginationClasses }, body.map((item, i) => (React.createElement(InvertedIndicator, { key: item._uid || `pagination_${i}`, active: slide === i, color: properties.includes('pagination_dark') ? 'dark' : 'light', onClick: () => handleChangeIndex(item) })))))));
};
export default memo(Slider);
