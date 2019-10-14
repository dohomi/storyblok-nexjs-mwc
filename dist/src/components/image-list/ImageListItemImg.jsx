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
import { getImageAttrs } from '../../utils/ImageService';
import { componentLogger } from '../../utils/componentLogger';
var Image = function (props) {
    componentLogger(props);
    var aspectRatioStyles;
    var height = props.masonry || !props.aspect_ratio ? 0 : props.height;
    var width = props.width;
    var styles = {};
    if (props.image_crop) {
        height = props.height;
    }
    if (props.aspect_ratio && !props.masonry) {
        var splitAspectRatio = props.aspect_ratio.split('x');
        // @ts-ignore
        aspectRatioStyles = { paddingBottom: splitAspectRatio[1] / splitAspectRatio[0] * 100 + "%" };
    }
    var src = ''; // getSource(props.source, {width: 42, height: 42})
    var srcSet = '';
    if (props.inView && props.source) {
        var imgAttrs = getImageAttrs({
            originalSource: props.source,
            width: width,
            height: height,
            smart: props.image_crop === 'smart',
            fitInColor: props.fit_in_color
        });
        src = imgAttrs.src;
        srcSet = imgAttrs.srcSet;
    }
    function onLoad(ev) {
        var target = ev.target;
        target.classList.add('loaded');
        target.style.filter = 'blur(0)';
        target.style.backgroundColor = 'transparent';
    }
    if (aspectRatioStyles) {
        return (<div className="mdc-image-list__image-aspect-container" style={__assign(__assign({}, aspectRatioStyles), styles)}>
        <img src={src} srcSet={srcSet} style={{ backgroundColor: 'grey' }} className="mdc-image-list__image progressive-img-blur-container" onLoad={onLoad}/>
      </div>);
    }
    return (<img src={src} srcSet={srcSet} className="mdc-image-list__image" style={styles} onLoad={onLoad}/>);
};
export default Image;
