import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@rmwc/dialog';
import { IconButton } from '@rmwc/icon-button';
import SwipeableViews from 'react-swipeable-views';
import { getImageAttrs, getOriginalImageDimensions } from '../../utils/ImageService';
var Swipe = function (props) {
    var currentIndex = props.elements.findIndex(function (i) { return i._uid === props.lightbox; });
    function getImageSource(source) {
        var dimensionHeight = props.dimensions.height - 68 - 16;
        var dimensionWidth = props.dimensions.width - 48;
        var originalDimension = getOriginalImageDimensions(source);
        var imgWidth = originalDimension.width;
        var imgHeight = originalDimension.height;
        dimensionWidth = imgWidth <= dimensionWidth ? imgWidth : dimensionWidth;
        dimensionHeight = imgHeight <= dimensionHeight ? imgHeight : dimensionHeight;
        var landscape = dimensionWidth > dimensionHeight;
        return getImageAttrs({
            originalSource: source,
            width: landscape ? 0 : dimensionWidth,
            height: landscape ? dimensionHeight : 0
        });
    }
    function handleChangeIndex(index) {
        props.onImageClick(props.elements[index]);
    }
    return (<div className="carousel slide">
      <SwipeableViews index={currentIndex} className="carousel-inner h-100 text-center" onChangeIndex={handleChangeIndex}>
        {props.elements.map(function (item) { return (<div key={item._uid} className="carousel-item d-block">
            <img {...getImageSource(item.source)} className='img-fluid'/>
          </div>); })}
      </SwipeableViews>
      <a className="carousel-control-prev" role="button" onClick={function () { return props.onImageClick(currentIndex === 0 ? props.elements[props.elements.length - 1] : props.elements[currentIndex - 1]); }}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" role="button" onClick={function () { return props.onImageClick(currentIndex === props.elements.length - 1 ? props.elements[0] : props.elements[currentIndex + 1]); }}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <ol className="carousel-indicators" style={{ color: 'white' }}>
        {props.elements.map(function (item) { return (<li className={"" + (props.lightbox === item._uid ? 'active' : '')} onClick={function () { return props.onImageClick(item); }} key={item._uid}>
          </li>); })}
      </ol>
    </div>);
};
var ImageListLightbox = function (props) {
    return (<Dialog className="lm-dialog-lightbox" open={!!props.lightbox}>
      <DialogTitle className="pb-0 text-white text-right">{IconButton({
        icon: 'clear',
        onClick: function () { return props.setLightbox(); }
    })}</DialogTitle>
      <DialogContent className="pb-0 h-100">{Swipe(props)}</DialogContent>
    </Dialog>);
};
export default ImageListLightbox;
