import { getImageAttrs } from '../../utils/ImageService';
import { getImage } from '../../utils/fetchImageHelper';
import React, { useEffect } from 'react';
import { useWindowDimensions } from '../provider/WindowDimensionsProvider';
var BackgroundImage = function (_a) {
    var image = _a.image;
    var dimensions = useWindowDimensions();
    var createRef = React.createRef();
    useEffect(function () {
        var current = createRef.current;
        if (current) {
            var width = current.clientWidth;
            var height = current.clientHeight;
            var img = getImageAttrs({
                originalSource: image,
                width: width,
                height: height,
                smart: true
            });
            getImage({
                src: img.src,
                srcSet: img.srcSet,
                onReady: function (imageSource) {
                    current.style.filter = 'blur(0)';
                    current.style.backgroundImage = "url('" + imageSource + "')";
                }
            });
        }
    }, [dimensions, image]);
    return (<div className="lm-background-image lm-background__absolute-fill progressive-img-container" ref={createRef}>
    </div>);
};
export default BackgroundImage;
