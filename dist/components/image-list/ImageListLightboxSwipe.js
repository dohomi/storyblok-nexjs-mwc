import React from 'react';
import { getImageAttrs, getOriginalImageDimensions } from '../../utils/ImageService';
import SwipeableViews from 'react-swipeable-views';
import InvertedIndicator from '../slider/InvertedIndicator';
import { ChevronLeft, ChevronRight } from 'mdi-material-ui';
const Swipe = (props) => {
    let currentIndex = props.elements.findIndex(i => i._uid === props.lightbox);
    function getImageSource(source) {
        let dimensionHeight = props.dimensions.height - 68 - 16;
        let dimensionWidth = props.dimensions.width - 48;
        const originalDimension = getOriginalImageDimensions(source);
        const imgWidth = originalDimension.width;
        const imgHeight = originalDimension.height;
        dimensionWidth = imgWidth <= dimensionWidth ? imgWidth : dimensionWidth;
        dimensionHeight = imgHeight <= dimensionHeight ? imgHeight : dimensionHeight;
        const landscape = dimensionWidth > dimensionHeight;
        return getImageAttrs({
            originalSource: source,
            width: landscape ? 0 : dimensionWidth,
            height: landscape ? dimensionHeight : 0
        });
    }
    function handleChangeIndex(index) {
        props.onImageClick(props.elements[index]);
    }
    return (React.createElement("div", { className: "carousel slide" },
        React.createElement(SwipeableViews, { index: currentIndex, className: "carousel-inner", onChangeIndex: handleChangeIndex }, props.elements.map(item => (React.createElement("div", { key: item._uid, className: "carousel-item" },
            React.createElement("figure", { className: "d-block" },
                React.createElement("img", Object.assign({}, getImageSource(item.source), { className: 'img-fluid' }))))))),
        React.createElement("a", { className: "carousel-control-prev", role: "button", onClick: () => props.onImageClick(currentIndex === 0 ? props.elements[props.elements.length - 1] : props.elements[currentIndex - 1]) },
            React.createElement(ChevronLeft, null)),
        React.createElement("a", { className: "carousel-control-next", role: "button", onClick: () => props.onImageClick(currentIndex === props.elements.length - 1 ? props.elements[0] : props.elements[currentIndex + 1]) },
            React.createElement(ChevronRight, null)),
        React.createElement("ol", { className: "carousel-indicators" }, props.elements.map((item) => (React.createElement(InvertedIndicator, { key: item._uid, active: props.lightbox === item._uid, color: 'light', onClick: () => props.onImageClick(item) }))))));
};
export default Swipe;
